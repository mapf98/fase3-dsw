import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PrimalEntity } from '../../../app/entities/base-entity';
import { ProductCatalogue } from './product-catalogue.entity';
import { Category } from './category.entity';

@Entity({ name: 'catalogues' })
export class Catalogue extends PrimalEntity {
    @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    description: string;

    @Column({ name: 'term', type: 'varchar', length: 150, nullable: true })
    term: string;

    @JoinColumn({ name: 'category_id' })
    @ManyToOne(
        type => Category,
        category => category.catalogues,
        { nullable: false, onUpdate: 'CASCADE' },
    )
    category: Category;

    @OneToMany(
        type => ProductCatalogue,
        productCatalogues => productCatalogues.catalogue,
    )
    productCatalogues: ProductCatalogue[];
}
