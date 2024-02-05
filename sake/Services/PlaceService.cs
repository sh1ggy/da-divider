using Divider.ApiModels;
using Divider.Models;

namespace Divider.Service;

public class PlaceService : IPlaceService
{
    private IPlaceRepository _repository;
    public PlaceService(IPlaceRepository repository)
    {
        _repository = repository;
    }
    public Place CreatePlace(CreatePlaceRequest creationRequest)
    {
        Place place = new Place
        {
            Name = creationRequest.Name,
            NightId = creationRequest.NightId,
        };
        _repository.CreatePlace(place);
        return place;
    }

    public Place? DeletePlace(int placeId)
    {
        if (placeId == 0) return null;
        return _repository.DeletePlace(placeId);
    }

    public Place? EditPlace(EditPlaceRequest editRequest, int placeId)
    {
        if (editRequest == null) return null;
        return _repository.EditPlace(editRequest.Place);
    }

    public IEnumerable<Place> GetPlaces(int nightId)
    {
        IEnumerable<Place> places = _repository.GetPlaces(nightId);
        return places;
    }
}