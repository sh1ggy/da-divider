using Divider.ApiModels;
using Divider.Models;
using Divider.Repository;

namespace Divider.Service;

public class NightService : INightService
{
  private INightRepository _repository;
  public NightService(INightRepository repository)
  {
    _repository = repository;
  }
  public Night CreateNight(CreateNightRequest createNightRequest)
  {
    Night night = new Night
    {
      Date = createNightRequest.Date
    };
    _repository.CreateNight(night);
    return night;
  }

  public Night? DeleteNight(int nightId)
  {
    Night? night = _repository.DeleteNight(nightId);
    return night;
  }

  public Night? EditNight(EditNightRequest editNightRequest)
  {
    Night? night = _repository.EditNight(editNightRequest.Night);
    return night;
  }

  public IEnumerable<Night> GetNights()
  {
    IEnumerable<Night> nights = _repository.GetNights();
    return nights;
  }
}