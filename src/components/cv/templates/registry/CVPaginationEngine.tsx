import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CricketCVFull } from '../../CVTypes';
import { TEMPLATE_REGISTRY } from './TemplateRegistry';
import './TemplateRegistry.css';

// Context to pass allowed block IDs per page
interface PageContextProps {
  allowedIds: string[] | null;
  isPreview?: boolean;
}

const PageContext = createContext<PageContextProps>({
  allowedIds: null,
  isPreview: false
});

export const usePageContext = () => useContext(PageContext);

// Wrapper for atomic block components (carrying break-inside: avoid)
export const CVAtomicBlock = ({ 
  id, 
  children, 
  className = "" 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string; 
  key?: React.Key;
}) => {
  const { allowedIds } = usePageContext();
  if (allowedIds && !allowedIds.includes(id)) {
    return null;
  }
  return (
    <div 
      data-page-block-id={id} 
      className={`cv-atomic-block ${className}`}
      style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
    >
      {children}
    </div>
  );
};

// Wrapper for section headings (glue rule built in)
export const CVSectionHeading = ({ 
  id, 
  children, 
  className = "" 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string; 
  key?: React.Key;
}) => {
  const { allowedIds } = usePageContext();
  if (allowedIds && !allowedIds.includes(id)) {
    return null;
  }
  return (
    <div 
      data-page-heading-id={id} 
      className={`cv-section-heading ${className}`}
      style={{ breakAfter: 'avoid', pageBreakAfter: 'avoid' }}
    >
      {children}
    </div>
  );
};

// Column wrapper to differentiate sidebar (left) vs main (right)
export const CVColumn = ({ 
  type, 
  children, 
  className = "" 
}: { 
  type: 'left' | 'right'; 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div data-column={type} className={`cv-column-${type} ${className}`}>
      {children}
    </div>
  );
};

interface PageAssignment {
  left: string[];
  right: string[];
}

export const CVPaginatedRenderer = ({
  cv,
  accentColour,
  font,
  isPreview,
  TemplateComponent
}: {
  cv: CricketCVFull;
  accentColour: string;
  font: string;
  isPreview?: boolean;
  TemplateComponent: React.ComponentType<any>;
}) => {
  const [pages, setPages] = useState<PageAssignment[] | null>(null);
  const sandboxRef = useRef<HTMLDivElement>(null);
  const templateConfig = TEMPLATE_REGISTRY[cv.templateId]?.config || TEMPLATE_REGISTRY.executive.config;

  useEffect(() => {
    const calculateBreaks = () => {
      const sandbox = sandboxRef.current;
      if (!sandbox) return;

      const parentRect = sandbox.getBoundingClientRect();
      const elements = sandbox.querySelectorAll('[data-page-block-id], [data-page-heading-id]');
      
      const leftBlocks: any[] = [];
      const rightBlocks: any[] = [];

      elements.forEach((el) => {
        const blockId = el.getAttribute('data-page-block-id');
        const headingId = el.getAttribute('data-page-heading-id');
        const id = blockId || headingId!;
        const isHeading = !!headingId;
        const rect = el.getBoundingClientRect();
        
        const isLeftColumn = el.closest('[data-column="left"]') !== null;
        
        const measured = {
          id,
          isHeading,
          height: rect.height,
          top: rect.top - parentRect.top
        };

        if (isLeftColumn) {
          leftBlocks.push(measured);
        } else {
          rightBlocks.push(measured);
        }
      });

      // Height budget per page
      const usableHeight = templateConfig.height - templateConfig.marginTop - templateConfig.marginBottom;

      // Group elements for a column
      const groupColumn = (colBlocks: any[]) => {
        if (colBlocks.length === 0) return [[]];
        
        const pagesList: string[][] = [[]];
        let currentHeight = 0;

        for (let i = 0; i < colBlocks.length; i++) {
          const block = colBlocks[i];

          // Heading glue logic
          if (block.isHeading && i < colBlocks.length - 1) {
            const nextBlock = colBlocks[i + 1];
            const combinedHeight = block.height + nextBlock.height;

            if (currentHeight + combinedHeight > usableHeight) {
              pagesList.push([block.id, nextBlock.id]);
              currentHeight = nextBlock.height;
              i++; // skip next block
              continue;
            }
          }

          if (currentHeight + block.height > usableHeight) {
            pagesList.push([block.id]);
            currentHeight = block.height;
          } else {
            pagesList[pagesList.length - 1].push(block.id);
            currentHeight += block.height + (templateConfig.sectionGap / 2);
          }
        }
        return pagesList;
      };

      const rightPages = groupColumn(rightBlocks);
      const leftPages = groupColumn(leftBlocks);

      // Synced column page boundary breaks
      const maxPages = Math.max(rightPages.length, leftPages.length, 1);
      const assignments: PageAssignment[] = [];
      for (let i = 0; i < maxPages; i++) {
        assignments.push({
          left: leftPages[i] || [],
          right: rightPages[i] || []
        });
      }

      setPages(assignments);
    };

    calculateBreaks();
    const t = setTimeout(calculateBreaks, 150);
    return () => clearTimeout(t);
  }, [cv, cv.templateId, templateConfig]);

  React.useEffect(() => {
    if (isPreview && pages && pages.length > 0) {
      window.dispatchEvent(new CustomEvent('cv-page-count', { detail: pages.length }));
    }
  }, [pages, isPreview]);


  // Watermark Component
  const Watermark = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-50">
      <div 
        className="text-slate-400/20 text-4xl md:text-5xl font-black uppercase tracking-widest border-4 border-slate-400/20 px-8 py-4 rounded-xl rotate-[-30deg] text-center"
        style={{ whiteSpace: 'nowrap' }}
      >
        THE CRICKET ADVISOR<br/>
        <span className="text-xl tracking-wider">PREVIEW</span>
      </div>
    </div>
  );

  if (!pages) {
    // If pages are not computed yet, render standard full sandbox in loading state
    return (
      <div ref={sandboxRef} style={{ width: `${templateConfig.width}px` }} className={`relative bg-white template-${cv.templateId}`}>
        <PageContext.Provider value={{ allowedIds: null, isPreview }}>
          <TemplateComponent cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />
        </PageContext.Provider>
      </div>
    );
  }

  // Render paginated pages
  return (
    <div className="cv-document-paginated" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Offscreen Sandbox for continuous measurement */}
      <div 
        ref={sandboxRef} 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          top: '-9999px', 
          width: `${templateConfig.width}px`, 
          pointerEvents: 'none' 
        }} 
        aria-hidden="true"
        className={`template-${cv.templateId}`}
      >
        <PageContext.Provider value={{ allowedIds: null, isPreview }}>
          <TemplateComponent cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />
        </PageContext.Provider>
      </div>

      {/* Actual Paginated Output */}
      {pages.map((pageData, index) => {
        const allowedIds = [...pageData.left, ...pageData.right];
        return (
          <div 
            key={index}
            className={`cv-page-container bg-white shadow-lg relative overflow-hidden template-${cv.templateId}`}
            style={{
              width: `${templateConfig.width}px`,
              height: `${templateConfig.height}px`,
              paddingTop: `${templateConfig.marginTop}px`,
              paddingBottom: `${templateConfig.marginBottom}px`,
              paddingLeft: `${templateConfig.marginLeft}px`,
              paddingRight: `${templateConfig.marginRight}px`,
              boxSizing: 'border-box'
            }}
          >
            {isPreview && <Watermark />}
            
            <PageContext.Provider value={{ allowedIds, isPreview }}>
              <TemplateComponent cv={cv} accentColour={accentColour} font={font} isPreview={isPreview} />
            </PageContext.Provider>

          </div>
        );
      })}
    </div>
  );
};
