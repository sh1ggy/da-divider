using Divider.ApiModels;
using Divider.Models;

namespace Divider.Service;

public interface INightService 
{
  public IEnumerable<Night> GetNights();
  public Night GetNightById(int nightId);
  public Night CreateNight(CreateNightRequest createNightRequest);
  public Night? DeleteNight(int nightId);
  public Night? EditNight(EditNightRequest editNightRequest);
}