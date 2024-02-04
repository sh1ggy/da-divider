using Divider.Models;
using Divider.ApiModels;

namespace Divider.Service;

public interface IPlaceService
{
  public IEnumerable<Place> GetPlaces();
  public Place CreatePlace(CreatePlaceRequest createPlaceRequest);
  public Place? DeletePlace(int placeId);
  public Place? EditPlace(EditPlaceRequest editPlaceRequest, int placeId);
}
