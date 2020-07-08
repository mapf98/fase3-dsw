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
}

export default new PetromilesAuthRepository();
