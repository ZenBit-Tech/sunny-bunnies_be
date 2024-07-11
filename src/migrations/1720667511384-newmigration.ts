import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigration1720667511384 implements MigrationInterface {
    name = 'Newmigration1720667511384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`password_salt\` varchar(255) NOT NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`otp_token\` varchar(255) NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`deleted_at\` timestamp NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`review\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reviewed_user_id\` varchar(36) NULL, \`review_user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_rating\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ratedUserId\` varchar(36) NULL, \`ratingUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`role\` enum ('buyer', 'vendor', 'admin') NULL, \`phone_number\` varchar(255) NOT NULL, \`profile_photo\` varchar(255) NULL, \`address_line_one\` varchar(255) NOT NULL, \`address_line_two\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`clothes_size\` varchar(255) NOT NULL, \`jeans_size\` varchar(255) NOT NULL, \`shoe_size\` varchar(255) NOT NULL, \`is_registration_completed\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`styles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sizes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_variants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quantity\` int NOT NULL, \`product_id\` int NULL, \`size_id\` int NULL, \`color_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`materials\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`description\` text NOT NULL, \`gender\` enum ('male', 'female') NOT NULL, \`status\` enum ('forSale', 'forRent', 'both') NOT NULL, \`activity_status\` enum ('active', 'inactive', 'rejected') NOT NULL, \`min_price\` decimal(10,2) NOT NULL, \`max_price\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`category_id\` int NULL, \`style_id\` int NULL, \`brand_id\` int NULL, \`material_id\` int NULL, \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` text NOT NULL, \`description\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`product_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`colors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_card\` (\`card_id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`cardNumber\` varchar(255) NOT NULL, \`expireDate\` varchar(255) NOT NULL, \`cvvCode\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_d7fa5bc81ffc9708abd2d210c4\` (\`user_id\`), PRIMARY KEY (\`card_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_followers\` (\`user_id\` varchar(36) NOT NULL, \`follower_id\` varchar(36) NOT NULL, INDEX \`IDX_a59d62cda8101214445e295cdc\` (\`user_id\`), INDEX \`IDX_da722d93356ae3119d6be40d98\` (\`follower_id\`), PRIMARY KEY (\`user_id\`, \`follower_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_types\` (\`category_id\` int NOT NULL, \`type_id\` int NOT NULL, INDEX \`IDX_b7e18de459b048b1b24011b7d6\` (\`category_id\`), INDEX \`IDX_fac4cabce4506ac2ef19bdb365\` (\`type_id\`), PRIMARY KEY (\`category_id\`, \`type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_styles\` (\`category_id\` int NOT NULL, \`style_id\` int NOT NULL, INDEX \`IDX_0a98590e50aec0359c3eb32e1e\` (\`category_id\`), INDEX \`IDX_2c1adb0014a83006a1274aaf7f\` (\`style_id\`), PRIMARY KEY (\`category_id\`, \`style_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_brands\` (\`category_id\` int NOT NULL, \`brand_id\` int NOT NULL, INDEX \`IDX_0f2577d3e847475ecf0f9aefdb\` (\`category_id\`), INDEX \`IDX_dcb5e8a55a4180e383aafdb193\` (\`brand_id\`), PRIMARY KEY (\`category_id\`, \`brand_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_materials\` (\`category_id\` int NOT NULL, \`material_id\` int NOT NULL, INDEX \`IDX_fc3ec44378e65b4c1656664b91\` (\`category_id\`), INDEX \`IDX_3290ae2654ea9fbdaead046c0a\` (\`material_id\`), PRIMARY KEY (\`category_id\`, \`material_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_reviews\` ADD CONSTRAINT \`FK_fe95e8f5ef4e9e5f2b5823e515a\` FOREIGN KEY (\`reviewed_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_reviews\` ADD CONSTRAINT \`FK_28c345f7f5f4503823776baf867\` FOREIGN KEY (\`review_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_ea48a1c77892149d972a933e48f\` FOREIGN KEY (\`ratedUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_rating\` ADD CONSTRAINT \`FK_1efab1ea60d67fca6cb8eed3719\` FOREIGN KEY (\`ratingUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_6ca9503d77ae39b4b5a6cc3ba88\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_6343513e20e2deab45edfce1316\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_bf3e96b7fc720a0ea3a81953373\` FOREIGN KEY (\`size_id\`) REFERENCES \`sizes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_8b91b27dcad5b2bdb13977a176d\` FOREIGN KEY (\`color_id\`) REFERENCES \`colors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_9a5f6868c96e0069e699f33e124\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_d00d8be5351b1df51fe14bfec26\` FOREIGN KEY (\`style_id\`) REFERENCES \`styles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_211fb444345b0221eab8cbc5522\` FOREIGN KEY (\`material_id\`) REFERENCES \`materials\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_176b502c5ebd6e72cafbd9d6f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_4f166bb8c2bfcef2498d97b4068\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_card\` ADD CONSTRAINT \`FK_d7fa5bc81ffc9708abd2d210c4a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_followers\` ADD CONSTRAINT \`FK_a59d62cda8101214445e295cdc8\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_followers\` ADD CONSTRAINT \`FK_da722d93356ae3119d6be40d988\` FOREIGN KEY (\`follower_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_types\` ADD CONSTRAINT \`FK_b7e18de459b048b1b24011b7d68\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_types\` ADD CONSTRAINT \`FK_fac4cabce4506ac2ef19bdb3650\` FOREIGN KEY (\`type_id\`) REFERENCES \`types\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_styles\` ADD CONSTRAINT \`FK_0a98590e50aec0359c3eb32e1ee\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_styles\` ADD CONSTRAINT \`FK_2c1adb0014a83006a1274aaf7ff\` FOREIGN KEY (\`style_id\`) REFERENCES \`styles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_brands\` ADD CONSTRAINT \`FK_0f2577d3e847475ecf0f9aefdb4\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_brands\` ADD CONSTRAINT \`FK_dcb5e8a55a4180e383aafdb1937\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_materials\` ADD CONSTRAINT \`FK_fc3ec44378e65b4c1656664b918\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_materials\` ADD CONSTRAINT \`FK_3290ae2654ea9fbdaead046c0a2\` FOREIGN KEY (\`material_id\`) REFERENCES \`materials\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_materials\` DROP FOREIGN KEY \`FK_3290ae2654ea9fbdaead046c0a2\``);
        await queryRunner.query(`ALTER TABLE \`category_materials\` DROP FOREIGN KEY \`FK_fc3ec44378e65b4c1656664b918\``);
        await queryRunner.query(`ALTER TABLE \`category_brands\` DROP FOREIGN KEY \`FK_dcb5e8a55a4180e383aafdb1937\``);
        await queryRunner.query(`ALTER TABLE \`category_brands\` DROP FOREIGN KEY \`FK_0f2577d3e847475ecf0f9aefdb4\``);
        await queryRunner.query(`ALTER TABLE \`category_styles\` DROP FOREIGN KEY \`FK_2c1adb0014a83006a1274aaf7ff\``);
        await queryRunner.query(`ALTER TABLE \`category_styles\` DROP FOREIGN KEY \`FK_0a98590e50aec0359c3eb32e1ee\``);
        await queryRunner.query(`ALTER TABLE \`category_types\` DROP FOREIGN KEY \`FK_fac4cabce4506ac2ef19bdb3650\``);
        await queryRunner.query(`ALTER TABLE \`category_types\` DROP FOREIGN KEY \`FK_b7e18de459b048b1b24011b7d68\``);
        await queryRunner.query(`ALTER TABLE \`user_followers\` DROP FOREIGN KEY \`FK_da722d93356ae3119d6be40d988\``);
        await queryRunner.query(`ALTER TABLE \`user_followers\` DROP FOREIGN KEY \`FK_a59d62cda8101214445e295cdc8\``);
        await queryRunner.query(`ALTER TABLE \`user_card\` DROP FOREIGN KEY \`FK_d7fa5bc81ffc9708abd2d210c4a\``);
        await queryRunner.query(`ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_4f166bb8c2bfcef2498d97b4068\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_211fb444345b0221eab8cbc5522\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_d00d8be5351b1df51fe14bfec26\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_9a5f6868c96e0069e699f33e124\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_8b91b27dcad5b2bdb13977a176d\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_bf3e96b7fc720a0ea3a81953373\``);
        await queryRunner.query(`ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_6343513e20e2deab45edfce1316\``);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_6ca9503d77ae39b4b5a6cc3ba88\``);
        await queryRunner.query(`ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_1efab1ea60d67fca6cb8eed3719\``);
        await queryRunner.query(`ALTER TABLE \`users_rating\` DROP FOREIGN KEY \`FK_ea48a1c77892149d972a933e48f\``);
        await queryRunner.query(`ALTER TABLE \`users_reviews\` DROP FOREIGN KEY \`FK_28c345f7f5f4503823776baf867\``);
        await queryRunner.query(`ALTER TABLE \`users_reviews\` DROP FOREIGN KEY \`FK_fe95e8f5ef4e9e5f2b5823e515a\``);
        await queryRunner.query(`DROP INDEX \`IDX_3290ae2654ea9fbdaead046c0a\` ON \`category_materials\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc3ec44378e65b4c1656664b91\` ON \`category_materials\``);
        await queryRunner.query(`DROP TABLE \`category_materials\``);
        await queryRunner.query(`DROP INDEX \`IDX_dcb5e8a55a4180e383aafdb193\` ON \`category_brands\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f2577d3e847475ecf0f9aefdb\` ON \`category_brands\``);
        await queryRunner.query(`DROP TABLE \`category_brands\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c1adb0014a83006a1274aaf7f\` ON \`category_styles\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a98590e50aec0359c3eb32e1e\` ON \`category_styles\``);
        await queryRunner.query(`DROP TABLE \`category_styles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fac4cabce4506ac2ef19bdb365\` ON \`category_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_b7e18de459b048b1b24011b7d6\` ON \`category_types\``);
        await queryRunner.query(`DROP TABLE \`category_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_da722d93356ae3119d6be40d98\` ON \`user_followers\``);
        await queryRunner.query(`DROP INDEX \`IDX_a59d62cda8101214445e295cdc\` ON \`user_followers\``);
        await queryRunner.query(`DROP TABLE \`user_followers\``);
        await queryRunner.query(`DROP INDEX \`REL_d7fa5bc81ffc9708abd2d210c4\` ON \`user_card\``);
        await queryRunner.query(`DROP TABLE \`user_card\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
        await queryRunner.query(`DROP TABLE \`colors\``);
        await queryRunner.query(`DROP TABLE \`product_images\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`materials\``);
        await queryRunner.query(`DROP TABLE \`product_variants\``);
        await queryRunner.query(`DROP TABLE \`sizes\``);
        await queryRunner.query(`DROP TABLE \`styles\``);
        await queryRunner.query(`DROP TABLE \`test\``);
        await queryRunner.query(`DROP INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`types\``);
        await queryRunner.query(`DROP TABLE \`users_rating\``);
        await queryRunner.query(`DROP TABLE \`users_reviews\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
