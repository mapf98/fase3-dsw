import { HttpRepository } from '@/http/http.repository';
import BaseModel from '@/store/base-module/models/BaseModel';

class BaseRepository extends HttpRepository {
}

export default new BaseRepository();