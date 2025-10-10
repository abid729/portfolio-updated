import { useEffect } from 'react';
import { trackVisitor } from '../utils/visitorTracker';

/**
 * Custom Hook for Visitor Tracking
 * Use this hook in your main App component
 * 
 * اس hook کو App component میں استعمال کریں
 */
const useVisitorTracking = () => {
  useEffect(() => {
    // Track visitor on component mount
    const initTracking = async () => {
      try {
        // Wait a bit to ensure page is fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Track the visitor
        const result = await trackVisitor();
        
        if (result.success && !result.duplicate) {
          console.log('✅ Visitor tracked successfully');
        } else if (result.duplicate) {
          console.log('ℹ️ Visitor already tracked recently');
        }
      } catch (error) {
        console.error('❌ Error tracking visitor:', error);
      }
    };
    
    initTracking();
  }, []);
};

export default useVisitorTracking;

