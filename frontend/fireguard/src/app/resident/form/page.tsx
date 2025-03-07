'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/form/input';
import Select from '@/app/components/form/select';
import Textarea from '@/app/components/form/textarea';

interface FormData {
  name: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  mobility_status: string;
  medical_needs: string;
  emergency_contact: string;
  emergency_phone: string;
  additional_info: string;
}

export default function AtRiskForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    mobility_status: '',
    medical_needs: '',
    emergency_contact: '',
    emergency_phone: '',
    additional_info: ''
  });

  const router = useRouter();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
];

  const mobilityOptions = [
    { value: 'independent', label: 'Fully Independent' },
    { value: 'assisted', label: 'Needs Assistance' },
    { value: 'wheelchair', label: 'Wheelchair User' },
    { value: 'bedridden', label: 'Bedridden' }
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | 
    { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Required fields validation
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.street) newErrors.street = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipcode) newErrors.zipcode = 'ZIP code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.mobility_status) newErrors.mobility_status = 'Mobility status is required';
    if (!formData.emergency_contact) newErrors.emergency_contact = 'Emergency contact is required';
    if (!formData.emergency_phone) newErrors.emergency_phone = 'Emergency contact phone is required';

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!phoneRegex.test(formData.emergency_phone.replace(/\D/g, ''))) {
      newErrors.emergency_phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setError(null);

    try {
      // Mock API endpoint - replace with your actual endpoint
      const response = await fetch('http://127.0.0.1:8000/onboard/at_risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus('success');
      router.push('/resident/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form';
      console.error('Submission error:', errorMessage);
      setSubmitStatus('error');
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#ffdbbb] mb-8 font-[family-name:var(--font-eb-garamond)]">
          At-Risk Resident Registration
        </h1>

        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-800/50 text-green-100 rounded-lg">
            Registration submitted successfully! We will review your information.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-800/50 text-red-100 rounded-lg">
            There was an error submitting your registration. Please try again.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-800/50 text-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            error={errors.street}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />

            <Select
              label="State"
              name="state"
              options={stateOptions}
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              required
            />
          </div>

          <Input
            label="ZIP Code"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            error={errors.zipcode}
            required
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <Select
            label="Mobility Status"
            name="mobility_status"
            options={mobilityOptions}
            value={formData.mobility_status}
            onChange={handleChange}
            error={errors.mobility_status}
            required
          />

          <Textarea
            label="Medical Needs"
            name="medical_needs"
            value={formData.medical_needs}
            onChange={handleChange}
            error={errors.medical_needs}
            placeholder="Please list any medical conditions, equipment, or special needs"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              error={errors.emergency_contact}
              required
            />

            <Input
              label="Emergency Contact Phone"
              name="emergency_phone"
              value={formData.emergency_phone}
              onChange={handleChange}
              error={errors.emergency_phone}
              required
            />
          </div>

          <Textarea
            label="Additional Information"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            error={errors.additional_info}
            placeholder="Any additional information that emergency responders should know"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`
              w-full
              px-6
              py-3
              bg-[#ffdbbb]
              text-gray-900
              rounded-lg
              font-bold
              transition-opacity
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            `}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}