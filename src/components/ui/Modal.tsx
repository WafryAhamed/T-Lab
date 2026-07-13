import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}>
        
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="relative w-full max-w-lg bg-card border border-line rounded-2xl shadow-xl"
          initial={{
            scale: 0.95,
            y: 10
          }}
          animate={{
            scale: 1,
            y: 0
          }}
          exit={{
            scale: 0.95,
            y: 10
          }}
          transition={{
            duration: 0.2
          }}>
          
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <h2 className="font-display text-lg font-semibold text-maintext">
                {title}
              </h2>
              <button
              onClick={onClose}
              aria-label="Close"
              className="text-secondary hover:text-maintext p-1 rounded-lg">
              
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
            {footer &&
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-line">
                {footer}
              </div>
          }
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}