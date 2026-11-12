import { appRouter } from "./appRouter";

export default function createServerTrpcCaller() {
    return appRouter.createCaller({});
}
