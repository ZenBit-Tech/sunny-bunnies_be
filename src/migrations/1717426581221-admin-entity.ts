import { MigrationInterface, QueryRunner } from 'typeorm';
import { randomUUID } from 'crypto';
import { genSalt, hash } from 'bcrypt';

class CreateAdminUser1717160000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userId = randomUUID();
    const profileId = randomUUID();
    const name = 'UAM Admin';
    const role = 'admin';
    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;
    const saltRounds = 10;
    const passwordSalt = await genSalt(saltRounds);
    const passwordHash = await hash(plainPassword, passwordSalt);
    const phoneNumber = '+380501231111';
    const addressLineOne = 'Address 1';
    const addressLineTwo = 'Address 2';
    const country = 'Country';
    const state = 'State';
    const city = 'City';
    const clothesSize = 'XL';
    const jeansSize = '34';
    const shoeSize = '10';
    const isRegistrationCompleted = true;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = createdAt;
    const isVerified = 1;

    await queryRunner.query(`
      INSERT INTO users (id, name, email, password_hash, password_salt, created_at, updated_at, is_verified)
      VALUES ('${userId}', '${name}', '${email}', '${passwordHash}', '${passwordSalt}', '${createdAt}', '${updatedAt}', '${isVerified}')
    `);

    await queryRunner.query(`
      INSERT INTO user_profiles (
        id, user_id, role, phone_number, address_line_one, address_line_two,
        country, state, city, clothes_size, jeans_size, shoe_size,
        is_registration_completed, created_at, updated_at
      ) VALUES (
        '${profileId}', '${userId}', '${role}', '${phoneNumber}', '${addressLineOne}', '${addressLineTwo}',
        '${country}', '${state}', '${city}', '${clothesSize}', '${jeansSize}', '${shoeSize}',
        ${isRegistrationCompleted}, '${createdAt}', '${updatedAt}'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const email = process.env.ADMIN_EMAIL;
    const user = await queryRunner.query(`
      SELECT id FROM users WHERE email = '${email}'
    `);
    const userId = user[0]?.id;

    await queryRunner.query(`
       DELETE FROM user_profiles WHERE user_id = '${userId}'
    `);

    await queryRunner.query(`
      DELETE FROM users WHERE id = '${userId}'
    `);
  }
}

export { CreateAdminUser1717160000000 };
