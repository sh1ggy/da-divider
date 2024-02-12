using Divider.ApiModels;
using Divider.Models;

public interface IPlaceRepository
{
  public IEnumerable<PlaceDTO> GetPlaces(int nightId);
  public void CreatePlace(Place place);
  public Place? DeletePlace(int placeId);
  public Place? EditPlace(Place place);
}