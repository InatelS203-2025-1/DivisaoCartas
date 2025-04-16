export default interface Controller {
    index: () => Promise<string | undefined>;
    show: (id: string) => Promise<unknown | Error>;
    store: () => Promise<unknown | Error>
}
