-- Add process_steps column to store Discovery, Conception, Tests, Delivery steps
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS process_steps jsonb DEFAULT '[]'::jsonb;

-- Add a comment to document the structure
COMMENT ON COLUMN public.projects.process_steps IS 'Array of process steps: [{title, description, image_url, image_caption}]';