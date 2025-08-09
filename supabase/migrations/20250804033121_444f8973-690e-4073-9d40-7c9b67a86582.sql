-- Add currency field to packages table
ALTER TABLE public.packages 
ADD COLUMN currency text DEFAULT 'INR';