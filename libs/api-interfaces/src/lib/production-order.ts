/**
 * ProductionOrder interface represents a manufacturing order in the ERP system.
 * Used for tracking production status and progress across the factory floor.
 */
export interface ProductionOrder {
  /** Unique identifier for the production order */
  id: string;
  
  /** Human-readable name/description of the order */
  name: string;
  
  /** Current operational status of the order */
  status: 'Running' | 'Idle' | 'Error';
  
  /** Completion progress as a percentage (0-100) */
  progress: number;
}
