import { PrismaClient } from "@prisma/client";
import {TIMER_15} from "~/constant";
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
    }
]
async function seed() {
    await Promise.all(
        getSampleTests().map((test) => {
            return db.test.create({ data: test });
        })
    );
}

seed();
