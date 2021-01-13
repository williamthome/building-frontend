import { NativeHttpClientAdapter } from '@/adapters'

export default new NativeHttpClientAdapter(process.env.API_URL || 'http://localhost:5051')
