export type Activity = {
    id: string
    user_id: string
    name: string
    category: string
    duration: number
    status: ActivityStatus
    archived: boolean
}
// TODO: Generate API types from FastAPI OpenAPI schema
export type ActivityStatus =
  | 'active'
  | 'completed'
  | 'abandoned'
  | 'invalidated'
