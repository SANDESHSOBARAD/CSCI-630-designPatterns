interface RemoteData {
  getData(): Promise<string>;
}

class RemoteDataProxy implements RemoteData {
  private realData: RealRemoteData;

  constructor(private readonly endpoint: string) {}

  public async getData(): Promise<string> {
    if (!this.realData) {
      // create the real data object here by making a network request
      const response = await fetch(this.endpoint);
      const data = await response.text();
      this.realData = new RealRemoteData(data);
    }

    return this.realData.getData();
  }
}

class RealRemoteData implements RemoteData {
  constructor(private readonly data: string) {}

  public async getData(): Promise<string> {
    // perform some processing on the remote data here
    return this.data.toUpperCase();
  }
}

// Example usage:
(async () => {
  const remoteData = new RemoteDataProxy('https://example.com/data');
  const data = await remoteData.getData();
  console.log(data); // logs the remote data in uppercase
})();
