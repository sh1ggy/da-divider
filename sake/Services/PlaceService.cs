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

    public IEnumerable<Contact> AssignContactToPlace(int placeId, int contactId, bool unassign)
    {
        if (unassign)
        {
            return _repository.UnassignContactToPlace(placeId, contactId);
        }
        return _repository.AssignContactToPlace(placeId, contactId);
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

    public Place? EditPlaceName(EditPlaceRequest editRequest, int placeId)
    {
        if (editRequest == null) return null;
        return _repository.EditPlaceName(editRequest.Place);
    }

    public Place GetPlaceById(int placeId)
    {
        return _repository.GetPlaceById(placeId);
    }

    public IEnumerable<Contact> GetPlaceContacts(int placeId)
    {
        return _repository.GetPlaceContacts(placeId);
    }

    public IEnumerable<PlaceDTO> GetPlaces(int nightId)
    {
        IEnumerable<PlaceDTO> places = _repository.GetPlaces(nightId);
        return places;
    }
}