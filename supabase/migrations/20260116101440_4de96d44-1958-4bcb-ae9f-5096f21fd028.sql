-- Add sectors column to projects table (array of text for multiple sectors)
ALTER TABLE public.projects 
ADD COLUMN sectors text[] DEFAULT '{}';

-- Optional: Add comment for documentation
COMMENT ON COLUMN public.projects.sectors IS 'Array of activity sectors for the project';