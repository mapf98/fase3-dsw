import { HttpRepository } from '@/http/http.repository';

class CustomersRepository extends HttpRepository {
    private static readonly RESOURCE = 'users';

    public async updateCustomer(user) {
        return await this.patch(this.createUri([`${CustomersRepository.RESOURCE}`]), user);
    }
}

export default new CustomersRepository();
