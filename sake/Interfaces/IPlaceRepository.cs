using Divider.Models;

public interface IPlaceRepository
{
  public IEnumerable<Place> GetPlaces();
  public void CreatePlace(Place place);
  public Place? DeletePlace(int placeId);
  public Place? EditPlace(Place place);
}