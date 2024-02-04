using Divider.Models;

namespace Divider.Repository;

public interface INightRepository
{
  public IEnumerable<Night> GetNights();
  public void CreateNight(Night night);
  public Night? DeleteNight(int nightId);
  public Night? EditNight(Night night);
}