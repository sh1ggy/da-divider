using Divider.ApiModels;
using Divider.Models;

namespace Divider.Repository;

public interface INightRepository
{
  public IEnumerable<NightDTO> GetNights();
  public IEnumerable<Contact> GetNightContacts(int nightId);
  public IEnumerable<Place> GetNightPlaces(int nightId);
  public NightDTO GetNightById(int nightId);
  public void CreateNight(Night night);
  public Night? DeleteNight(int nightId);
  public Night? EditNight(Night night);
  public IEnumerable<Contact> AssignContactToNight(int nightId, int contactId, bool unassign);
  public IEnumerable<Contact> UnassignContactToNight(int nightId, int contactId, bool unassign);
}