import { useState } from 'react';
import type { OrderData } from '../types';

interface UseOrderFormResult {
  formData: OrderData;
  isSubmitting: boolean;
  error: string | null;
  updateField: <K extends keyof OrderData>(field: K, value: OrderData[K]) => void;
  handleSubmit: (onSubmit: (data: OrderData) => Promise<void>, errorMessage: string) => (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: OrderData = {
  name: '',
  phone: '',
  pickupTime: '',
  notes: '',
};

export function useOrderForm(): UseOrderFormResult {
  const [formData, setFormData] = useState<OrderData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof OrderData>(field: K, value: OrderData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (onSubmit: (data: OrderData) => Promise<void>, errorMessage: string) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      try {
        await onSubmit(formData);
      } catch {
        setError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    error,
    updateField,
    handleSubmit,
    resetForm,
  };
}
