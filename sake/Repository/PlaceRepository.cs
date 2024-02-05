using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class PlaceRepository : IPlaceRepository
{
  private IUnitOfWork _unitOfWork;
  public PlaceRepository(IUnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.\
  }
  public void CreatePlace(Place place)
  {
    _unitOfWork.Context.Places.Add(place);
    _unitOfWork.Context.SaveChanges();
  }

  public Place? DeletePlace(int placeId)
  {
    Place? res = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == placeId);
    if (res != null)
    {
      _unitOfWork.Context.Places.Remove(res);
      _unitOfWork.Context.SaveChanges();
    }
    return null;
  }

  public Place? EditPlace(Place place)
  {
    Place? res = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == place.Id);
    if (res != null)
    {
      res = place;
      _unitOfWork.Context.Places.Update(res);
      _unitOfWork.Context.SaveChanges();
      return res;
    }
    return null;
  }

  public IEnumerable<Place> GetPlaces(int nightId)
  {
    List<Place> places = _unitOfWork.Context.Places
      .Where(p => p.NightId == nightId)
      .ToList();
    return places;
  }
}