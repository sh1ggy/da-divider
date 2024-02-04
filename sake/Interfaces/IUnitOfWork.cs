using Divider.Models;

namespace Divider.Repository;

public interface IUnitOfWork : IDisposable
{
  DividersContext Context { get; }
}