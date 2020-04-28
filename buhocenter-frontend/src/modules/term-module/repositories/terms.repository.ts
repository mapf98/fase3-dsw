import { HttpRepository } from '@/http/http.repository';
import TermModel from '@/store/term-module/models/TermModel';

class TermsRepository extends HttpRepository {

    public async getTermsLanguage(language: string): Promise<{ terms: TermModel }> {
        return this.get(this.createUri(['content'], {language}));
    }
}

export default new TermsRepository();