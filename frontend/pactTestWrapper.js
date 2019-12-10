jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

beforeAll(() => provider.setup())

beforeEach(()=> provider.verify())

afterAll(() => provider.finalize())