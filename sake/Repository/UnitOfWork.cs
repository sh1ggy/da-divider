using Divider.Models;

namespace Divider.Repository;

public class UnitOfWork : IUnitOfWork
{
  public DividersContext Context { get; }

  public void Dispose()
  {
    Context.Dispose();
  }

  public UnitOfWork(DividersContext context)
  {
    Context = context;
  }
}
