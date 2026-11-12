export type TaskProperties = {
    readonly id: string;
    readonly title: string;
    readonly description: string | null;
    readonly createdAt: string;
};

export default class Task {
    readonly #id: string;
    readonly #title: string;
    readonly #description: string | null;
    readonly #createdAt: string;

    constructor({ id, title, description, createdAt }: TaskProperties) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#createdAt = createdAt;

        Object.freeze(this);
    }

    get id(): string {
        return this.#id;
    }

    get title(): string {
        return this.#title;
    }

    get description(): string | null {
        return this.#description;
    }

    get createdAt(): string {
        return this.#createdAt;
    }
}
