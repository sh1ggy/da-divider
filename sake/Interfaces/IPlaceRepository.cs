using Divider.ApiModels;
using Divider.Models;

public interface IPlaceRepository
{
  public IEnumerable<PlaceDTO> GetPlaces(int nightId);
  public IEnumerable<Contact> AssignContactToPlace(int placeId, int contactId);
  public IEnumerable<Contact> UnassignContactToPlace(int placeId, int contactId);
  public IEnumerable<Contact> GetPlaceContacts(int placeId);
  public void CreatePlace(Place place);
  public Place? DeletePlace(int placeId);
  public Place? EditPlaceName(Place place);
}