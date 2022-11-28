import { PrismaClient } from '@prisma/client';
import { TIMER_15 } from '~/constant';
const db = new PrismaClient();

const getSampleTests = () => [
	{
		wpm: 88,
		accuracy: 0.98,
		timer: TIMER_15,
		timeTyped: 15,
	},
	{
		wpm: 100,
		accuracy: 1,
		timer: TIMER_15,
		timeTyped: 15,
	},
];
async function seed() {
	const bao = await db.user.create({
		data: {
			username: 'bao',
			// this is a hashed version of "twixrox"
			passwordHash:
				'$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
		},
	});
	await Promise.all(
		getSampleTests().map(test => {
			return db.test.create({ data: { userId: bao.id,...test } });
		}),
	);
}

seed();
