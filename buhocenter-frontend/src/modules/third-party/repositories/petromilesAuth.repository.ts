import { HttpRepository } from '@/http/http.repository';
import { PetromilesAuth } from '../interfaces/petromilesAuth.interface';

class PetromilesAuthRepository extends HttpRepository {
    private static readonly RESOURCE = 'third-party';

    authorize(petromiles: PetromilesAuth): Promise<boolean> {
        return this.post(
            this.createUri([`${PetromilesAuthRepository.RESOURCE}`, 'authorize']),
            petromiles,
            this.createHeader(),
        );
    }

    authorizeCode(petromiles: PetromilesAuth): Promise<boolean> {
        return this.post(
            this.createUri([`${PetromilesAuthRepository.RESOURCE}`, 'authorize-code']),
            petromiles,
            this.createHeader(),
        );
    }

    verifyUser(petromiles: PetromilesAuth): Promise<boolean> {
        return this.get(
            this.createUri([
                `${PetromilesAuthRepository.RESOURCE}/loyalty-associated-account?userId=${petromiles.id}`,
            ]),
            this.createHeader(),
        );
    }

    async generateCsv(): Promise<boolean>{
        const response = await this.post(this.createUri([`${PetromilesAuthRepository.RESOURCE}/download/clients-csv`]), {}, this.createHeader());
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'clients-synchronization.csv');
        document.body.appendChild(link);
        link.click();
        return true;
    }
}

export default new PetromilesAuthRepository();
