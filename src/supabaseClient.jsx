import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hymlqaxxxvnmkoxrzvvw.supabase.co'
const supabaseKey = 'sb_publishable_HJ4gMiSuHDlbxGlZff8qig_wtrnUJ3s'

export const supabase = createClient(supabaseUrl, supabaseKey)