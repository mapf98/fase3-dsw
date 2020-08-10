import { Catalogue } from '../../entities/catalogue.entity';
import { Category } from '../../entities/category.entity';
import { Status } from 'src/modules/status/entities/status.entity';
import { Timestamp } from 'typeorm';

function createCatalogue(name: string, description: string, term: string, category: Category, status: Status): Catalogue {
  return { name, description, term, category, status } as Catalogue;
}

export function createCatalogueResponse(name: string,
                                        description: string,
                                        term: string,
                                        category: Category,
                                        status: Status,
                                        createdAt: Date,
                                        updatedAt: Date,
                                        id: number): Catalogue {
  return { name, description, term, category, status, createdAt, updatedAt, id } as Catalogue;
}

function createCategory(id: number): Category {
  return {id} as Category;
}

function createStatus(id: number): Status {
  return {id} as Status;
}

export const catalogueMockDB: Catalogue = createCatalogue('Computers',
                                                          'Catalogo de Computadoras',
                                                          'COMPUTERS',
                                                          createCategory(1),
                                                          createStatus(1));

export const catalogueResponseMockDB: Catalogue = createCatalogueResponse('Computers',
                                                                          'Catalogo de Computadoras',
                                                                          'COMPUTERS',
                                                                          createCategory(1),
                                                                          createStatus(1),
                                                                          new Date(),
                                                                          new Date(),
                                                                          1);
