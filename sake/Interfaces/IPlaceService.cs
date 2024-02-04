using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IPlaceService
{
  public IEnumerable<Place> GetPlaces();
  public Place CreatePlace(CreatePlaceRequest creationRequest);
  public Place? DeletePlace(int placeId);
  public Place? EditPlace(EditPlaceRequest editRequest, int placeId);
}
