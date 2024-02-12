using Divider.ApiModels;
using Divider.Models;

namespace Divider.Service;

public interface INightService 
{
  public IEnumerable<NightDTO> GetNights();
  public IEnumerable<Contact> GetNightContacts(int nightId);
  public IEnumerable<Place> GetNightPlaces(int nightId);
  public NightDTO GetNightById(int nightId);
  public Night CreateNight(CreateNightRequest createNightRequest);
  public Night? DeleteNight(int nightId);
  public Night? EditNight(EditNightRequest editNightRequest);
  public IEnumerable<Contact> AssignContactToNight(int nightId, int contactId);
}