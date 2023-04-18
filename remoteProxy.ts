interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
}

class GitHubAPI implements Repo{
  id: number;
  name: string;
  full_name: string;
  html_url: string;

  constructor(data: Repo) {
    this.id = data.id;
    this.name = data.name;
    this.full_name = data.full_name;
    this.html_url = data.html_url;
  }

  async getUserRepos(username: string): Promise<GitHubAPI[]> {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch user repos: ${response.statusText}`);
    }
    const repos = await response.json();
    return repos.map((repo: any) => new GitHubAPI({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
    }));
  }
}

class GitHubAPIProxy {
  private api = new GitHubAPI({
    id: 0,
    name: '',
    full_name: '',
    html_url: '',
  });

  async getProxyUserRepos(username: string): Promise<GitHubAPI[]> {
    // Add any additional behavior or validation here
    return this.api.getUserRepos(username);
  }
}

// Example usage
const api = new GitHubAPIProxy();
api.getProxyUserRepos('abhilashSreenivasa').then(repos => console.log(repos));
