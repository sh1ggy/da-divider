using Divider.Models;

namespace Divider.ApiModels;

public class CreateNightRequest : BaseRequest
{
  public DateTime Date { get; set; } = DateTime.UtcNow;
}
public class CreateNightResponse : Night
{
  // Empty response
}

public class EditNightRequest : BaseRequest
{
  public required Night Night { get; set; }
}

public class NightDTO : BaseEntity
{
  public required DateTime Date { get; set; }
}

public class AssignContactRequest : BaseRequest
{
  public required Contact contact { get; set; }
  public required int nightId { get; set; }
}