using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IPlaceService
{
  public IEnumerable<PlaceDTO> GetPlaces(int nightId);
  public IEnumerable<Contact> AssignContactToPlace(int placeId, int contactId, bool unassign);
  public IEnumerable<Contact> GetPlaceContacts(int placeId);
  public Place CreatePlace(CreatePlaceRequest createPlaceRequest);
  public Place? DeletePlace(int placeId);
  public Place? EditPlaceName(EditPlaceRequest editPlaceRequest, int placeId);
}
