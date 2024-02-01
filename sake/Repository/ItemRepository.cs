using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class ItemRepository : IItemRepository
{
    protected readonly IUnitOfWork _unitOfWork;
    public ItemRepository(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.
    }
    public void CreateItem(Item item)
    {
        _unitOfWork.Context.Items.Add(item);
        _unitOfWork.Context.SaveChanges();
    }

    public IEnumerable<Item> GetItemsByPlace(int placeId)
    {
        // List<Item> items = _unitOfWork.Context.Items
        //     .Where(i => i.ContactId == placeId)
        //     .ToList();
        List<Item> items = _unitOfWork.Context.Items.ToList();
        return items;
    }

    public Item DeleteItem(int itemId)
    {
        var res = _unitOfWork.Context.Items
            .FirstOrDefault(i => i.Id == itemId);
        if (res != null)
        {
            _unitOfWork.Context.Items.Remove(res);
            _unitOfWork.Context.SaveChanges();
            return res;
        }
        return null;
    }
}