using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class NightRepository : INightRepository
{
  IUnitOfWork _unitOfWork;
  public NightRepository(IUnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.\
  }
  public void CreateNight(Night night)
  {
    _unitOfWork.Context.Nights.Add(night);
    _unitOfWork.Context.SaveChanges();
    return;
  }

  public Night? DeleteNight(int nightId)
  {
    Night? res = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == nightId);
    if (res != null)
    {
      _unitOfWork.Context.Nights.Remove(res);
      _unitOfWork.Context.SaveChanges();
    }
    return res;
  }

  public Night? EditNight(Night night)
  {
    Night? res = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == night.Id);
    if (res != null)
    {
      res = night;
      _unitOfWork.Context.Nights.Update(res);
      _unitOfWork.Context.SaveChanges();
    }
    return res;
  }

  public IEnumerable<Night> GetNights()
  {
    IEnumerable<Night> nights = _unitOfWork.Context.Nights.ToList();
    return nights;
  }
}