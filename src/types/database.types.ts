export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    display_name: string
                    bio: string | null
                    city: string
                    languages: Json
                    created_at: string
                }
                Insert: {
                    id: string
                    display_name: string
                    bio?: string | null
                    city: string
                    languages?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    display_name?: string
                    bio?: string | null
                    city?: string
                    languages?: Json
                    created_at?: string
                }
                Relationships: []
            }
            meetups: {
                Row: {
                    id: string
                    host_id: string
                    city: string
                    starts_at: string
                    area: string
                    duration_min: number
                    group_size: number
                    budget_yen: number
                    language_ratio: Json
                    payment_type: string
                    beginner_friendly: boolean
                    public_place_only: boolean
                    rules: Json
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    host_id: string
                    city: string
                    starts_at: string
                    area: string
                    duration_min: number
                    group_size: number
                    budget_yen: number
                    language_ratio: Json
                    payment_type: string
                    beginner_friendly?: boolean
                    public_place_only?: boolean
                    rules?: Json
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    host_id?: string
                    city?: string
                    starts_at?: string
                    area?: string
                    duration_min?: number
                    group_size?: number
                    budget_yen?: number
                    language_ratio?: Json
                    payment_type?: string
                    beginner_friendly?: boolean
                    public_place_only?: boolean
                    rules?: Json
                    status?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "meetups_host_id_fkey"
                        columns: ["host_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            rsvps: {
                Row: {
                    id: string
                    meetup_id: string
                    user_id: string
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    meetup_id: string
                    user_id: string
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    meetup_id?: string
                    user_id?: string
                    status?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "rsvps_meetup_id_fkey"
                        columns: ["meetup_id"]
                        referencedRelation: "meetups"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "rsvps_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            reports: {
                Row: {
                    id: string
                    reporter_id: string
                    target_user_id: string | null
                    meetup_id: string | null
                    reason: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    reporter_id: string
                    target_user_id?: string | null
                    meetup_id?: string | null
                    reason: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    reporter_id?: string
                    target_user_id?: string | null
                    meetup_id?: string | null
                    reason?: string
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "reports_reporter_id_fkey"
                        columns: ["reporter_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "reports_target_user_id_fkey"
                        columns: ["target_user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "reports_meetup_id_fkey"
                        columns: ["meetup_id"]
                        referencedRelation: "meetups"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {}
        Functions: {
            join_meetup: {
                Args: {
                    meetup_id_param: string
                }
                Returns: Json
            }
        }
        Enums: {}
        CompositeTypes: {}
    }
}
