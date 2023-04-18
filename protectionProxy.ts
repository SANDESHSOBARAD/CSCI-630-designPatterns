interface IData {
  getData(): string;
}

class RealObject implements IData {
  private sensitiveData: string;

  constructor(sensitiveData: string) {
    this.sensitiveData = sensitiveData;
  }

  getData(): string {
    return this.sensitiveData;
  }
}

// Protection Proxy
class ProtectionProxy implements IData {
  private realObject: RealObject;
  private userRole: string;

  constructor(sensitiveData: string, userRole: string) {
    this.realObject = new RealObject(sensitiveData);
    this.userRole = userRole;
  }

  getData(): string {
    if (this.userRole === 'admin') {
      return this.realObject.getData();
    } else {
      throw new Error('Access denied. You do not have permission to access this data.');
    }
  }
}

// Client code
const protectionProxy: IData = new ProtectionProxy('sensitive data', 'admin');
console.log(protectionProxy.getData()); // Output: 'sensitive data'

const protectionProxy2: IData = new ProtectionProxy('sensitive data', 'user');
console.log(protectionProxy2.getData()); // Throws an error: 'Access denied. You do not have permission to access this data.'
