import createSeedTasks from "./createSeedTasks";
import InMemoryTaskRepository from "./InMemoryTaskRepository";

type GlobalWithSharedTaskRepository = typeof globalThis & {
    sharedTaskRepository?: InMemoryTaskRepository;
};

const globalWithSharedTaskRepository = globalThis as GlobalWithSharedTaskRepository;

const sharedTaskRepository =
    globalWithSharedTaskRepository.sharedTaskRepository ?? new InMemoryTaskRepository(createSeedTasks());

globalWithSharedTaskRepository.sharedTaskRepository = sharedTaskRepository;

export default sharedTaskRepository;
