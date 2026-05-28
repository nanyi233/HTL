const WordRoots = [
  {
    id: 1,
    root: "UCLASS()",
    origin: "反射宏系统",
    meaning: "将C++类暴露给UE反射系统和蓝图",
    description: "UCLASS() 是虚幻引擎最核心的宏之一，用于将一个C++类注册到UE的反射系统中。只有标记了UCLASS()的类才能被蓝图继承、被垃圾回收系统管理、以及在编辑器中序列化。使用时需要在类声明前加上UCLASS()宏，并在类体内第一行加上GENERATED_BODY()宏。常用说明符包括：Blueprintable（允许蓝图继承）、BlueprintType（允许作为蓝图变量类型）、Abstract（抽象类，不可实例化）。每个UCLASS类都必须继承自UObject或其子类。",
    examples: [
      {
        word: "UCLASS(Blueprintable)",
        meaning: "允许蓝图继承该C++类",
        breakdown: { root: "UCLASS()" },
        explanation: "添加Blueprintable说明符后，设计师可以在编辑器中基于该C++类创建蓝图子类，实现C++与蓝图的协作开发。"
      },
      {
        word: "UCLASS(Abstract)",
        meaning: "声明抽象基类，不可直接实例化",
        breakdown: { root: "UCLASS()" },
        explanation: "Abstract说明符使该类成为抽象类，无法在编辑器中直接放置或实例化，只能作为其他类的基类使用。"
      },
      {
        word: "UCLASS(BlueprintType)",
        meaning: "允许该类作为蓝图变量类型使用",
        breakdown: { root: "UCLASS()" },
        explanation: "BlueprintType使该类可以在蓝图中作为变量类型声明，常用于数据容器类或自定义对象类型。"
      }
    ],
    quiz: {
      question: "UCLASS()宏的主要作用是什么？",
      options: [
        "优化C++代码的编译速度",
        "将C++类注册到UE反射系统，支持蓝图和GC",
        "声明类的构造函数",
        "定义类的内存布局"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 2,
    root: "UPROPERTY()",
    origin: "反射宏系统",
    meaning: "将成员变量暴露给反射系统、编辑器和蓝图",
    description: "UPROPERTY() 宏用于标记类的成员变量，使其能够被UE的反射系统识别。被标记的属性可以在编辑器中显示和编辑、被垃圾回收系统追踪（防止野指针）、在蓝图中读写、以及自动序列化保存。常用说明符：EditAnywhere（在任何地方可编辑）、VisibleAnywhere（只读显示）、BlueprintReadWrite（蓝图可读写）、BlueprintReadOnly（蓝图只读）、Category（分类显示）、Replicated（网络同步）。对于UObject指针，必须使用UPROPERTY()才能被GC正确追踪。",
    examples: [
      {
        word: "UPROPERTY(EditAnywhere, BlueprintReadWrite, Category=\"Combat\")",
        meaning: "可在编辑器任意位置编辑，蓝图可读写，归类到Combat",
        breakdown: { root: "UPROPERTY()" },
        explanation: "这是最常用的属性声明方式，适合需要在编辑器中调整且蓝图需要访问的游戏参数，如角色生命值、移动速度等。"
      },
      {
        word: "UPROPERTY(Replicated)",
        meaning: "该属性会在网络游戏中自动同步到客户端",
        breakdown: { root: "UPROPERTY()" },
        explanation: "Replicated说明符配合GetLifetimeReplicatedProps函数使用，实现多人游戏中的属性网络同步。"
      },
      {
        word: "UPROPERTY(VisibleDefaultsOnly)",
        meaning: "只在默认值面板中可见，运行时只读",
        breakdown: { root: "UPROPERTY()" },
        explanation: "适合组件引用等不需要在实例上修改的属性，保持数据安全性的同时允许在蓝图默认值中查看。"
      }
    ],
    quiz: {
      question: "为什么UObject指针成员变量必须使用UPROPERTY()标记？",
      options: [
        "为了让变量在蓝图中可见",
        "为了让GC系统追踪该指针，防止悬空指针",
        "为了提高访问速度",
        "为了支持多线程访问"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 3,
    root: "UFUNCTION()",
    origin: "反射宏系统",
    meaning: "将成员函数暴露给反射系统和蓝图",
    description: "UFUNCTION() 宏用于将C++函数注册到UE反射系统，使其可以被蓝图调用、作为事件绑定、或通过RPC进行网络调用。常用说明符：BlueprintCallable（蓝图可调用）、BlueprintImplementableEvent（蓝图实现的事件，C++声明）、BlueprintNativeEvent（C++有默认实现，蓝图可覆盖）、Server/Client/NetMulticast（网络RPC）、CallInEditor（编辑器中可调用）。BlueprintImplementableEvent函数不需要C++函数体，BlueprintNativeEvent需要实现_Implementation后缀的函数。",
    examples: [
      {
        word: "UFUNCTION(BlueprintCallable, Category=\"Gameplay\")",
        meaning: "蓝图可调用的C++函数",
        breakdown: { root: "UFUNCTION()" },
        explanation: "最常用的蓝图交互方式，C++实现具体逻辑，蓝图通过节点调用，实现逻辑与表现的分离。"
      },
      {
        word: "UFUNCTION(BlueprintNativeEvent)",
        meaning: "C++有默认实现，蓝图可覆盖",
        breakdown: { root: "UFUNCTION()" },
        explanation: "需要同时声明 void MyFunc_Implementation()，蓝图可以覆盖默认行为，不覆盖时执行C++实现。"
      },
      {
        word: "UFUNCTION(Server, Reliable, WithValidation)",
        meaning: "可靠的服务器RPC函数",
        breakdown: { root: "UFUNCTION()" },
        explanation: "客户端调用，在服务器执行。Reliable保证送达，WithValidation需要实现_Validate函数进行安全验证。"
      }
    ],
    quiz: {
      question: "BlueprintNativeEvent和BlueprintImplementableEvent的区别是？",
      options: [
        "没有区别，只是命名不同",
        "NativeEvent有C++默认实现可被蓝图覆盖，ImplementableEvent只能由蓝图实现",
        "ImplementableEvent性能更好",
        "NativeEvent只能在服务器调用"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 4,
    root: "AActor",
    origin: "核心基类",
    meaning: "可以放置在关卡中的所有对象的基类",
    description: "AActor 是UE中可以放置或生成到游戏世界中的所有对象的基类。它提供了Transform（位置、旋转、缩放）、组件系统、Tick更新、网络复制等基础功能。AActor的生命周期包括：构造函数→BeginPlay→Tick→EndPlay→Destroy。重要的虚函数：BeginPlay（游戏开始时调用）、Tick（每帧调用）、EndPlay（销毁前调用）。Actor可以包含多个Component，其中RootComponent决定Actor的Transform。常见子类：APawn（可被控制）、ACharacter（带角色移动）、AGameMode等。",
    examples: [
      {
        word: "SpawnActor<AMyActor>()",
        meaning: "在世界中动态生成一个Actor",
        breakdown: { root: "AActor" },
        explanation: "通过GetWorld()->SpawnActor<T>()在运行时动态创建Actor，可以指定生成位置、旋转和参数。"
      },
      {
        word: "Actor->Destroy()",
        meaning: "销毁一个Actor并从世界中移除",
        breakdown: { root: "AActor" },
        explanation: "调用Destroy()后Actor会在当前帧结束时被销毁，EndPlay会被调用，GC会在之后回收内存。"
      },
      {
        word: "GetActorLocation()",
        meaning: "获取Actor在世界空间中的位置",
        breakdown: { root: "AActor" },
        explanation: "返回FVector类型的世界坐标，对应RootComponent的世界位置，是最常用的位置查询函数。"
      }
    ],
    quiz: {
      question: "AActor的BeginPlay函数在什么时候被调用？",
      options: [
        "Actor被创建时立即调用",
        "游戏开始或Actor被生成到世界后调用",
        "每帧都会调用",
        "Actor被销毁时调用"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 5,
    root: "UActorComponent",
    origin: "组件系统",
    meaning: "Actor组件基类，提供可复用的功能模块",
    description: "UActorComponent 是所有Actor组件的基类，代表可以附加到Actor上的功能模块。组件系统是UE的核心设计模式，通过组合而非继承来扩展功能。UActorComponent本身没有Transform，适合纯逻辑组件（如状态机、属性系统）。USceneComponent继承自它，增加了Transform和层级关系，适合有空间位置的组件。UPrimitiveComponent进一步增加了渲染和碰撞能力。创建自定义组件时继承UActorComponent，在OwnerActor的构造函数中用CreateDefaultSubobject<T>()创建。",
    examples: [
      {
        word: "CreateDefaultSubobject<UStaticMeshComponent>(TEXT(\"Mesh\"))",
        meaning: "在构造函数中创建组件",
        breakdown: { root: "UActorComponent" },
        explanation: "只能在构造函数中调用，创建并注册组件到Actor。TEXT()宏用于创建唯一的组件名称标识符。"
      },
      {
        word: "GetComponentByClass<UHealthComponent>()",
        meaning: "从Actor上获取指定类型的组件",
        breakdown: { root: "UActorComponent" },
        explanation: "运行时查找Actor上的组件，返回第一个匹配类型的组件指针，找不到返回nullptr。"
      },
      {
        word: "SetComponentTickEnabled(false)",
        meaning: "禁用组件的Tick更新",
        breakdown: { root: "UActorComponent" },
        explanation: "对于不需要每帧更新的组件，禁用Tick可以显著提升性能，是常见的优化手段。"
      }
    ],
    quiz: {
      question: "UActorComponent和USceneComponent的主要区别是？",
      options: [
        "UActorComponent性能更好",
        "USceneComponent有Transform和层级关系，UActorComponent没有",
        "UActorComponent可以渲染，USceneComponent不能",
        "两者完全相同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 6,
    root: "TSubclassOf<T>",
    origin: "类型系统",
    meaning: "类型安全的类引用，用于存储UClass指针",
    description: "TSubclassOf<T> 是UE提供的模板类，用于存储一个类的引用（UClass*），并在编译期保证类型安全——只能存储T或T的子类。在编辑器中，TSubclassOf属性会显示为类选择器，只显示T的子类供选择。常用于：工厂模式（存储要生成的Actor类型）、技能系统（存储技能类）、UI系统（存储Widget类）。与直接使用UClass*相比，TSubclassOf提供了类型检查，避免运行时类型错误。配合SpawnActor或CreateWidget使用时非常方便。",
    examples: [
      {
        word: "TSubclassOf<AActor> EnemyClass",
        meaning: "存储敌人Actor的类引用",
        breakdown: { root: "TSubclassOf<T>" },
        explanation: "在UPROPERTY中声明后，编辑器会显示AActor子类选择器，设计师可以选择具体的敌人类型。"
      },
      {
        word: "GetWorld()->SpawnActor<AActor>(EnemyClass, SpawnTransform)",
        meaning: "使用类引用动态生成Actor",
        breakdown: { root: "TSubclassOf<T>" },
        explanation: "将TSubclassOf传给SpawnActor，实现运行时动态决定生成哪种类型的Actor，是工厂模式的典型应用。"
      },
      {
        word: "TSubclassOf<UUserWidget> HUDClass",
        meaning: "存储HUD Widget的类引用",
        breakdown: { root: "TSubclassOf<T>" },
        explanation: "配合CreateWidget<UUserWidget>(GetWorld(), HUDClass)使用，动态创建UI界面。"
      }
    ],
    quiz: {
      question: "TSubclassOf<AActor>可以存储哪些类型？",
      options: [
        "只能存储AActor本身",
        "AActor及其所有子类",
        "任意UObject子类",
        "只能存储APawn子类"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 7,
    root: "TWeakObjectPtr<T>",
    origin: "智能指针系统",
    meaning: "弱引用指针，不阻止GC回收对象",
    description: "TWeakObjectPtr<T> 是UE的弱引用智能指针，持有对UObject的弱引用，不会阻止垃圾回收器回收对象。当被引用的对象被GC回收后，弱指针会自动变为无效（IsValid()返回false），避免野指针崩溃。适用场景：缓存对象引用但不想影响其生命周期、观察者模式中的被观察者引用、UI中引用游戏对象等。使用前必须调用IsValid()检查有效性。与TSharedPtr不同，TWeakObjectPtr专门用于UObject体系，而TSharedPtr用于非UObject的C++对象。",
    examples: [
      {
        word: "TWeakObjectPtr<AActor> TargetActor",
        meaning: "弱引用目标Actor，不阻止其被销毁",
        breakdown: { root: "TWeakObjectPtr<T>" },
        explanation: "AI系统中常用弱引用存储目标，当目标被销毁时弱指针自动失效，避免访问已销毁对象。"
      },
      {
        word: "if (TargetActor.IsValid())",
        meaning: "使用前检查弱指针是否有效",
        breakdown: { root: "TWeakObjectPtr<T>" },
        explanation: "IsValid()检查对象是否仍然存在且未被标记为待销毁，是使用弱指针的必要安全检查。"
      },
      {
        word: "TargetActor.Get()",
        meaning: "获取弱指针指向的原始指针",
        breakdown: { root: "TWeakObjectPtr<T>" },
        explanation: "Get()返回原始指针，如果对象已被销毁则返回nullptr，建议先IsValid()再Get()。"
      }
    ],
    quiz: {
      question: "TWeakObjectPtr和普通指针相比的主要优势是？",
      options: [
        "访问速度更快",
        "对象被GC回收后自动失效，避免野指针",
        "可以跨线程安全访问",
        "自动管理对象生命周期"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 8,
    root: "FString",
    origin: "字符串系统",
    meaning: "UE的动态字符串类型，支持Unicode",
    description: "FString 是UE中最常用的字符串类型，类似于std::string但针对UE优化。它是可变的动态字符串，支持Unicode（UTF-16）。常用操作：拼接用+或Append()、格式化用FString::Printf()、转换用ToString()、比较用Equals()。UE有三种主要字符串类型：FString（可变，用于操作）、FName（不可变，用于标识符，比较快）、FText（本地化文本，用于UI显示）。字符串字面量使用TEXT()宏包裹以支持Unicode，如TEXT(\"Hello World\")。",
    examples: [
      {
        word: "FString::Printf(TEXT(\"HP: %d\"), Health)",
        meaning: "格式化字符串，类似sprintf",
        breakdown: { root: "FString" },
        explanation: "Printf是最常用的字符串格式化方式，支持%d、%f、%s等格式符，返回新的FString对象。"
      },
      {
        word: "UE_LOG(LogTemp, Warning, TEXT(\"%s\"), *MyString)",
        meaning: "输出日志时用*解引用FString",
        breakdown: { root: "FString" },
        explanation: "UE_LOG需要TCHAR*类型，用*运算符将FString转换为TCHAR*指针，是UE日志输出的标准写法。"
      },
      {
        word: "MyString.Contains(TEXT(\"keyword\"))",
        meaning: "检查字符串是否包含子串",
        breakdown: { root: "FString" },
        explanation: "Contains()默认不区分大小写，可以传入ESearchCase::CaseSensitive参数进行区分大小写的搜索。"
      }
    ],
    quiz: {
      question: "在UE_LOG中输出FString时，为什么需要在变量前加*？",
      options: [
        "这是C++解引用指针的语法",
        "将FString转换为UE_LOG需要的TCHAR*类型",
        "获取字符串的长度",
        "这是UE的特殊语法糖"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 9,
    root: "TArray<T>",
    origin: "容器系统",
    meaning: "UE的动态数组，类似std::vector",
    description: "TArray<T> 是UE最常用的容器类型，功能类似std::vector，但针对UE的内存管理和反射系统进行了优化。支持UPROPERTY()标记，可以在编辑器中编辑和网络同步。常用操作：Add()添加元素、Remove()删除、Find()查找、Num()获取数量、Sort()排序、Contains()检查包含。TArray保证元素在内存中连续存储，适合频繁遍历。对于需要快速查找的场景，考虑使用TMap（哈希表）或TSet（集合）。遍历时推荐使用范围for循环或ForEach。",
    examples: [
      {
        word: "TArray<AActor*> Enemies",
        meaning: "存储敌人Actor指针的数组",
        breakdown: { root: "TArray<T>" },
        explanation: "配合UPROPERTY()使用时，GC会追踪数组中的所有UObject指针，防止悬空指针问题。"
      },
      {
        word: "Enemies.RemoveAll([](AActor* A){ return !IsValid(A); })",
        meaning: "使用Lambda移除所有无效的Actor",
        breakdown: { root: "TArray<T>" },
        explanation: "RemoveAll接受谓词函数，配合Lambda可以高效地批量删除满足条件的元素，是清理无效引用的常用方式。"
      },
      {
        word: "for (AActor* Enemy : Enemies)",
        meaning: "范围for循环遍历数组",
        breakdown: { root: "TArray<T>" },
        explanation: "UE推荐使用范围for循环遍历TArray，简洁高效。如果循环中需要修改数组，应使用反向索引遍历。"
      }
    ],
    quiz: {
      question: "TArray和TMap的主要使用场景区别是？",
      options: [
        "TArray用于存储字符串，TMap用于存储数字",
        "TArray适合顺序访问和遍历，TMap适合通过键快速查找",
        "TMap比TArray占用更少内存",
        "TArray不支持UPROPERTY，TMap支持"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 10,
    root: "Delegate（委托）",
    origin: "事件系统",
    meaning: "类型安全的函数指针，用于事件绑定和回调",
    description: "UE的委托系统是事件驱动编程的核心，提供类型安全的函数回调机制。主要类型：DECLARE_DELEGATE（单播，绑定一个函数）、DECLARE_MULTICAST_DELEGATE（多播，绑定多个函数）、DECLARE_DYNAMIC_DELEGATE（动态，支持蓝图绑定）、DECLARE_DYNAMIC_MULTICAST_DELEGATE（动态多播，用于蓝图事件）。使用流程：声明委托类型→声明委托变量→绑定函数（BindUObject/AddDynamic）→触发（Execute/Broadcast）。动态委托需要UPROPERTY()标记才能在蓝图中绑定。",
    examples: [
      {
        word: "DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnHealthChanged, float, NewHealth)",
        meaning: "声明带一个float参数的动态多播委托",
        breakdown: { root: "Delegate（委托）" },
        explanation: "动态多播委托是蓝图事件的基础，声明后配合UPROPERTY(BlueprintAssignable)可以在蓝图中绑定事件。"
      },
      {
        word: "OnHealthChanged.AddDynamic(this, &AMyActor::OnHealthChangedHandler)",
        meaning: "绑定成员函数到动态委托",
        breakdown: { root: "Delegate（委托）" },
        explanation: "AddDynamic用于绑定动态委托，函数签名必须与委托声明匹配，且函数必须标记UFUNCTION()。"
      },
      {
        word: "OnHealthChanged.Broadcast(NewHealth)",
        meaning: "触发多播委托，通知所有绑定的函数",
        breakdown: { root: "Delegate（委托）" },
        explanation: "Broadcast会依次调用所有已绑定的函数，是事件系统的触发点，常在状态变化时调用。"
      }
    ],
    quiz: {
      question: "DECLARE_DYNAMIC_MULTICAST_DELEGATE和DECLARE_MULTICAST_DELEGATE的区别是？",
      options: [
        "Dynamic版本性能更好",
        "Dynamic版本支持蓝图绑定，普通版本只支持C++绑定",
        "Dynamic版本只能绑定一个函数",
        "两者完全相同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 11,
    root: "UGameInstance",
    origin: "游戏框架",
    meaning: "游戏实例，在整个游戏生命周期中持久存在",
    description: "UGameInstance 是在整个游戏运行期间持续存在的单例对象，不随关卡切换而销毁。适合存储跨关卡的持久数据，如玩家存档、游戏设置、网络连接状态等。重要函数：Init()（游戏启动时调用）、Shutdown()（游戏退出时调用）。通过GetGameInstance<UMyGameInstance>()获取实例。与AGameMode（每个关卡独立）和AGameState（关卡状态）不同，GameInstance是真正的全局单例。在多人游戏中，每个客户端都有自己的GameInstance。",
    examples: [
      {
        word: "GetGameInstance<UMyGameInstance>()",
        meaning: "获取自定义GameInstance的类型安全指针",
        breakdown: { root: "UGameInstance" },
        explanation: "模板版本的GetGameInstance会自动进行类型转换，比Cast更简洁，是访问GameInstance的推荐方式。"
      },
      {
        word: "GameInstance->SaveGameData()",
        meaning: "通过GameInstance保存游戏数据",
        breakdown: { root: "UGameInstance" },
        explanation: "将存档逻辑放在GameInstance中，可以在任何关卡、任何时机调用，是管理持久化数据的最佳位置。"
      },
      {
        word: "UGameplayStatics::OpenLevel(this, FName(\"MainMenu\"))",
        meaning: "切换关卡，GameInstance数据保持不变",
        breakdown: { root: "UGameInstance" },
        explanation: "关卡切换时GameInstance不会被销毁，存储在其中的数据（如玩家金币、等级）会完整保留。"
      }
    ],
    quiz: {
      question: "UGameInstance和AGameMode的主要区别是？",
      options: [
        "GameInstance只在服务器存在，GameMode在所有端存在",
        "GameInstance跨关卡持久存在，GameMode随关卡销毁重建",
        "GameMode性能更好",
        "两者功能完全相同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 12,
    root: "Cast<T>()",
    origin: "类型系统",
    meaning: "UE安全类型转换，失败返回nullptr",
    description: "Cast<T>() 是UE提供的安全类型转换函数，类似dynamic_cast但针对UObject体系优化，性能更好。如果转换成功返回目标类型指针，失败返回nullptr（不会抛出异常）。使用前应检查返回值是否为nullptr。对于非UObject类型，使用标准C++的static_cast或dynamic_cast。CastChecked<T>()是断言版本，转换失败会触发断言崩溃，适合确定类型的场景。在性能敏感的代码中，如果已知类型，可以用static_cast替代Cast。",
    examples: [
      {
        word: "ACharacter* Character = Cast<ACharacter>(Actor)",
        meaning: "将AActor安全转换为ACharacter",
        breakdown: { root: "Cast<T>()" },
        explanation: "如果Actor实际上是ACharacter或其子类，转换成功；否则返回nullptr，避免类型错误导致的崩溃。"
      },
      {
        word: "if (APlayerController* PC = Cast<APlayerController>(Controller))",
        meaning: "在if条件中进行转换并检查",
        breakdown: { root: "Cast<T>()" },
        explanation: "C++17的if初始化语法，将Cast结果赋值并立即检查，是UE代码中最常见的类型安全访问模式。"
      },
      {
        word: "CastChecked<AMyCharacter>(GetOwner())",
        meaning: "断言转换，确定类型时使用",
        breakdown: { root: "Cast<T>()" },
        explanation: "当你100%确定类型时使用CastChecked，转换失败会立即崩溃并输出错误信息，便于调试。"
      }
    ],
    quiz: {
      question: "Cast<T>()和C++的dynamic_cast相比有什么优势？",
      options: [
        "Cast支持转换为基本类型",
        "Cast针对UObject体系优化，性能更好，且失败返回nullptr而非抛异常",
        "Cast可以跨线程使用",
        "Cast不需要RTTI支持"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 13,
    root: "FVector / FRotator",
    origin: "数学库",
    meaning: "三维向量和旋转角，UE空间计算的基础",
    description: "FVector 表示三维向量，用于位置、方向、速度等空间数据，包含X、Y、Z三个float分量。FRotator 表示欧拉角旋转，包含Pitch（俯仰）、Yaw（偏航）、Roll（翻滚）三个角度值（度数）。常用操作：向量加减乘除、点积（Dot）、叉积（Cross）、归一化（Normalize/GetSafeNormal）、长度（Size/Length）。FQuat是四元数，避免万向节死锁，适合插值运算。FTransform封装了位置、旋转、缩放，是完整的空间变换。UE坐标系：X轴向前，Y轴向右，Z轴向上。",
    examples: [
      {
        word: "FVector Direction = (Target - Source).GetSafeNormal()",
        meaning: "计算从Source到Target的单位方向向量",
        breakdown: { root: "FVector / FRotator" },
        explanation: "GetSafeNormal()在向量长度为零时返回零向量而不是崩溃，是归一化的安全版本，适合生产代码。"
      },
      {
        word: "FVector::DotProduct(Forward, ToTarget)",
        meaning: "计算两向量的点积，判断方向关系",
        breakdown: { root: "FVector / FRotator" },
        explanation: "点积结果>0表示同向，<0表示反向，=0表示垂直。配合acos可以计算两向量夹角，常用于视野检测。"
      },
      {
        word: "FRotator(0, 90, 0)",
        meaning: "创建Yaw旋转90度的旋转值",
        breakdown: { root: "FVector / FRotator" },
        explanation: "FRotator参数顺序是(Pitch, Yaw, Roll)，Yaw是水平旋转（绕Z轴），是最常用的旋转分量。"
      }
    ],
    quiz: {
      question: "UE坐标系中，X、Y、Z轴分别对应哪个方向？",
      options: [
        "X向右，Y向前，Z向上",
        "X向前，Y向右，Z向上",
        "X向上，Y向前，Z向右",
        "X向右，Y向上，Z向前"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 14,
    root: "LineTrace（射线检测）",
    origin: "物理系统",
    meaning: "从起点向终点发射射线，检测碰撞",
    description: "LineTrace是UE物理系统中最常用的碰撞检测方法，从起点向终点发射一条射线，返回第一个（或所有）碰撞结果。主要函数：LineTraceSingleByChannel（单次，按碰撞通道）、LineTraceSingleByObjectType（按对象类型）、LineTraceMultiByChannel（多次，返回所有碰撞）。FHitResult结构体包含碰撞信息：bBlockingHit（是否碰撞）、ImpactPoint（碰撞点）、ImpactNormal（碰撞法线）、GetActor()（碰撞的Actor）。常用于：射击检测、地面检测、视线检测、交互检测等。",
    examples: [
      {
        word: "GetWorld()->LineTraceSingleByChannel(HitResult, Start, End, ECC_Visibility)",
        meaning: "按可见性通道进行射线检测",
        breakdown: { root: "LineTrace（射线检测）" },
        explanation: "ECC_Visibility是最常用的碰撞通道，检测视线遮挡。返回bool值表示是否命中，命中信息存入HitResult。"
      },
      {
        word: "HitResult.GetActor()",
        meaning: "获取射线命中的Actor",
        breakdown: { root: "LineTrace（射线检测）" },
        explanation: "GetActor()是安全的访问方式，如果没有命中Actor则返回nullptr，避免空指针访问。"
      },
      {
        word: "DrawDebugLine(GetWorld(), Start, End, FColor::Red, false, 1.0f)",
        meaning: "绘制调试射线，可视化检测范围",
        breakdown: { root: "LineTrace（射线检测）" },
        explanation: "开发阶段用DrawDebugLine可视化射线路径，便于调试碰撞问题，发布时应移除或用宏控制。"
      }
    ],
    quiz: {
      question: "LineTraceSingleByChannel和LineTraceMultiByChannel的区别是？",
      options: [
        "Single只能检测静态物体，Multi可以检测动态物体",
        "Single返回第一个碰撞结果，Multi返回所有碰撞结果",
        "Multi性能比Single差很多，不建议使用",
        "两者功能完全相同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 15,
    root: "UUserWidget",
    origin: "UI系统(UMG)",
    meaning: "UMG UI控件的C++基类",
    description: "UUserWidget 是UE的UMG（Unreal Motion Graphics）UI系统的C++基类，用于创建游戏界面。通过继承UUserWidget并在编辑器中创建对应的蓝图Widget，可以实现C++逻辑与UI设计的分离。重要函数：NativeConstruct()（Widget创建时调用，类似BeginPlay）、NativeTick()（每帧更新）、NativeDestruct()（销毁时调用）。使用UPROPERTY(meta=(BindWidget))将C++变量绑定到编辑器中的UI控件。CreateWidget<T>()创建Widget实例，AddToViewport()显示到屏幕。",
    examples: [
      {
        word: "UPROPERTY(meta=(BindWidget)) UTextBlock* HealthText",
        meaning: "将C++变量绑定到蓝图中同名的UI控件",
        breakdown: { root: "UUserWidget" },
        explanation: "BindWidget会在Widget初始化时自动查找同名控件并赋值，如果找不到同名控件会报错，确保C++和蓝图的一致性。"
      },
      {
        word: "CreateWidget<UMyHUD>(GetWorld(), HUDClass)",
        meaning: "创建Widget实例",
        breakdown: { root: "UUserWidget" },
        explanation: "CreateWidget需要World上下文和Widget类，返回Widget实例，之后调用AddToViewport()才会显示在屏幕上。"
      },
      {
        word: "HealthText->SetText(FText::AsNumber(CurrentHealth))",
        meaning: "更新UI文本显示",
        breakdown: { root: "UUserWidget" },
        explanation: "SetText接受FText类型，FText::AsNumber()将数字转为本地化文本，是更新UI数值显示的标准方式。"
      }
    ],
    quiz: {
      question: "UPROPERTY(meta=(BindWidget))的作用是什么？",
      options: [
        "将属性暴露给蓝图编辑",
        "自动将C++变量绑定到蓝图Widget中同名的UI控件",
        "使UI控件支持网络同步",
        "优化UI渲染性能"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 16,
    root: "GetWorld()",
    origin: "世界上下文",
    meaning: "获取当前对象所在的UWorld实例",
    description: "GetWorld() 是UObject提供的函数，返回当前对象所在的UWorld实例。UWorld是UE中游戏世界的顶层容器，包含所有Actor、物理场景、导航网格等。几乎所有需要与游戏世界交互的操作都需要UWorld：生成Actor、射线检测、定时器、获取GameMode等。在某些上下文中GetWorld()可能返回nullptr（如CDO默认对象、编辑器工具类），使用前应检查。UGameplayStatics提供了许多静态函数，内部也需要World上下文，通常传入this或GetWorld()。",
    examples: [
      {
        word: "GetWorld()->GetTimerManager().SetTimer(TimerHandle, this, &AMyActor::OnTimer, 1.0f, true)",
        meaning: "设置每秒触发一次的定时器",
        breakdown: { root: "GetWorld()" },
        explanation: "TimerManager管理所有定时器，SetTimer的最后一个bool参数表示是否循环，TimerHandle用于后续清除定时器。"
      },
      {
        word: "GetWorld()->GetAuthGameMode<AMyGameMode>()",
        meaning: "获取当前关卡的GameMode",
        breakdown: { root: "GetWorld()" },
        explanation: "GetAuthGameMode只在服务器端有效（Authority），客户端返回nullptr，是多人游戏中访问GameMode的正确方式。"
      },
      {
        word: "GetWorld()->GetTimeSeconds()",
        meaning: "获取游戏运行的总时间（秒）",
        breakdown: { root: "GetWorld()" },
        explanation: "返回游戏开始后经过的时间，常用于计算冷却时间、动画时间轴等需要时间戳的场景。"
      }
    ],
    quiz: {
      question: "在什么情况下GetWorld()可能返回nullptr？",
      options: [
        "在多人游戏的客户端",
        "在CDO（类默认对象）或编辑器工具类中",
        "在BeginPlay之前",
        "在子线程中"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 17,
    root: "Replication（网络复制）",
    origin: "网络系统",
    meaning: "服务器到客户端的状态同步机制",
    description: "UE的网络复制系统基于服务器权威模型：服务器是权威端，客户端通过复制接收状态更新。Actor复制需要设置bReplicates=true。属性复制：UPROPERTY(Replicated)标记属性，在GetLifetimeReplicatedProps中注册，服务器修改后自动同步到客户端。RepNotify：UPROPERTY(ReplicatedUsing=OnRep_FuncName)，属性变化时在客户端触发回调函数。RPC（远程过程调用）：Server（客户端调用服务器执行）、Client（服务器调用客户端执行）、NetMulticast（服务器调用所有端执行）。",
    examples: [
      {
        word: "UPROPERTY(ReplicatedUsing=OnRep_Health) float Health",
        meaning: "Health变化时在客户端触发OnRep_Health",
        breakdown: { root: "Replication（网络复制）" },
        explanation: "RepNotify是实现客户端响应状态变化的核心机制，如更新UI、播放特效等，避免客户端主动轮询。"
      },
      {
        word: "UFUNCTION(Server, Reliable, WithValidation) void ServerFire()",
        meaning: "客户端调用、服务器执行的可靠RPC",
        breakdown: { root: "Replication（网络复制）" },
        explanation: "Server RPC需要实现ServerFire_Implementation()和ServerFire_Validate()，Validate返回false会踢出客户端。"
      },
      {
        word: "DOREPLIFETIME(AMyActor, Health)",
        meaning: "在GetLifetimeReplicatedProps中注册复制属性",
        breakdown: { root: "Replication（网络复制）" },
        explanation: "每个Replicated属性都必须在GetLifetimeReplicatedProps中用DOREPLIFETIME宏注册，否则不会被复制。"
      }
    ],
    quiz: {
      question: "UE网络复制的基本模型是什么？",
      options: [
        "P2P对等网络，所有客户端直接通信",
        "服务器权威模型，服务器是唯一权威，客户端接收复制",
        "客户端预测，服务器验证",
        "分布式状态机，所有端状态相同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 18,
    root: "UAbilitySystemComponent",
    origin: "GAS技能系统",
    meaning: "Gameplay Ability System的核心组件",
    description: "UAbilitySystemComponent（ASC）是UE的Gameplay Ability System（GAS）的核心，管理角色的技能、属性和效果。GAS是UE官方的技能框架，适合复杂的RPG/MOBA类游戏。主要概念：GameplayAbility（技能逻辑）、GameplayEffect（属性修改器）、AttributeSet（属性集合）、GameplayTag（标签系统）。ASC负责：授予和激活技能、应用和移除效果、管理属性值、处理标签。GAS学习曲线较陡，但提供了完整的技能系统解决方案，避免重复造轮子。",
    examples: [
      {
        word: "AbilitySystemComponent->GiveAbility(FGameplayAbilitySpec(AbilityClass, Level))",
        meaning: "授予角色一个技能",
        breakdown: { root: "UAbilitySystemComponent" },
        explanation: "GiveAbility将技能添加到ASC的技能列表，返回FGameplayAbilitySpecHandle用于后续激活或移除该技能。"
      },
      {
        word: "AbilitySystemComponent->TryActivateAbilityByClass(UMyAbility::StaticClass())",
        meaning: "尝试激活指定类型的技能",
        breakdown: { root: "UAbilitySystemComponent" },
        explanation: "TryActivateAbility会检查技能的激活条件（标签、冷却、消耗），满足条件才激活，返回是否成功。"
      },
      {
        word: "AbilitySystemComponent->ApplyGameplayEffectToSelf(EffectSpec, 1.0f, EffectContext)",
        meaning: "对自身应用一个Gameplay效果",
        breakdown: { root: "UAbilitySystemComponent" },
        explanation: "GameplayEffect可以修改属性（如减少HP）、添加标签（如眩晕状态）、触发其他效果，是GAS的核心机制。"
      }
    ],
    quiz: {
      question: "GAS中GameplayEffect的主要作用是什么？",
      options: [
        "处理输入事件",
        "修改属性值、添加/移除标签、触发其他效果",
        "渲染技能特效",
        "管理网络同步"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 19,
    root: "UDataAsset",
    origin: "数据管理",
    meaning: "数据资产，用于存储配置数据的UObject子类",
    description: "UDataAsset 是UE中存储游戏配置数据的推荐方式，继承自UObject，可以在编辑器中创建为资产文件（.uasset）。与DataTable（表格数据）不同，DataAsset更适合存储结构化的配置对象，如角色配置、武器参数、关卡配置等。优势：类型安全、支持引用其他资产、可以包含复杂逻辑、编辑器友好。使用方式：继承UDataAsset→添加UPROPERTY属性→在编辑器中右键创建资产→在代码中通过TObjectPtr或TSoftObjectPtr引用。PrimaryDataAsset支持资产管理器的异步加载。",
    examples: [
      {
        word: "UCLASS() class UWeaponData : public UDataAsset",
        meaning: "创建武器配置数据资产类",
        breakdown: { root: "UDataAsset" },
        explanation: "继承UDataAsset后，在编辑器中可以右键创建该类型的资产文件，每个武器类型对应一个资产实例。"
      },
      {
        word: "UPROPERTY(EditDefaultsOnly) TObjectPtr<UWeaponData> WeaponConfig",
        meaning: "引用武器配置数据资产",
        breakdown: { root: "UDataAsset" },
        explanation: "TObjectPtr是UE5推荐的对象引用方式，比原始指针更安全，支持访问追踪和调试。"
      },
      {
        word: "TSoftObjectPtr<UWeaponData> WeaponDataRef",
        meaning: "软引用，不立即加载资产",
        breakdown: { root: "UDataAsset" },
        explanation: "软引用不会在加载时立即加载目标资产，适合大型项目的按需加载，配合资产管理器实现异步加载。"
      }
    ],
    quiz: {
      question: "UDataAsset和DataTable的主要区别是？",
      options: [
        "DataTable性能更好",
        "DataAsset适合结构化配置对象，DataTable适合表格形式的批量数据",
        "DataAsset不支持编辑器编辑",
        "两者完全相同，只是命名不同"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 20,
    root: "UE_LOG()",
    origin: "调试工具",
    meaning: "UE的日志输出宏，用于调试信息输出",
    description: "UE_LOG() 是UE最基础的调试工具，用于输出日志信息到输出日志窗口和日志文件。语法：UE_LOG(LogCategory, Verbosity, Format, ...)。日志级别：Fatal（致命，会崩溃）、Error（错误）、Warning（警告）、Display（显示）、Log（普通）、Verbose（详细）、VeryVerbose（非常详细）。自定义日志类别：DECLARE_LOG_CATEGORY_EXTERN + DEFINE_LOG_CATEGORY。在Shipping版本中，Log和Verbose级别会被编译器优化掉。配合条件编译宏（#if WITH_EDITOR）可以只在编辑器模式下输出。",
    examples: [
      {
        word: "UE_LOG(LogTemp, Warning, TEXT(\"Health: %f\"), Health)",
        meaning: "输出警告级别的日志，显示生命值",
        breakdown: { root: "UE_LOG()" },
        explanation: "LogTemp是临时日志类别，适合快速调试。Warning级别会在日志中显示为黄色，便于识别。"
      },
      {
        word: "DECLARE_LOG_CATEGORY_EXTERN(LogMyGame, Log, All)",
        meaning: "声明自定义日志类别",
        breakdown: { root: "UE_LOG()" },
        explanation: "自定义日志类别便于过滤和管理日志，在.h中声明，在.cpp中用DEFINE_LOG_CATEGORY(LogMyGame)定义。"
      },
      {
        word: "GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT(\"Debug\"))",
        meaning: "在游戏屏幕上显示调试文字",
        breakdown: { root: "UE_LOG()" },
        explanation: "AddOnScreenDebugMessage在游戏视口中显示文字，第一个参数-1表示不覆盖，5.f是显示秒数，适合快速可视化调试。"
      }
    ],
    quiz: {
      question: "UE_LOG的日志级别中，哪个级别会导致程序崩溃？",
      options: [
        "Error",
        "Fatal",
        "Warning",
        "Critical"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 21,
    root: "APawn / ACharacter",
    origin: "核心基类",
    meaning: "可被控制器控制的Actor，ACharacter增加了角色移动",
    description: "APawn 是可以被AController（玩家或AI）控制的Actor基类，提供了输入处理和控制器接口。ACharacter 继承自APawn，增加了UCharacterMovementComponent（角色移动组件）和UCapsuleComponent（胶囊碰撞体），是大多数游戏角色的基类。ACharacter提供了完整的移动系统：行走、跳跃、游泳、飞行，以及网络预测。重要函数：SetupPlayerInputComponent()（绑定输入）、GetCharacterMovement()（获取移动组件）、Jump()、Crouch()。",
    examples: [
      {
        word: "void AMyCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)",
        meaning: "绑定玩家输入到角色函数",
        breakdown: { root: "APawn / ACharacter" },
        explanation: "SetupPlayerInputComponent在Pawn被玩家控制器控制时调用，用于绑定按键/轴输入到对应的处理函数。"
      },
      {
        word: "GetCharacterMovement()->MaxWalkSpeed = 600.f",
        meaning: "设置角色最大行走速度",
        breakdown: { root: "APawn / ACharacter" },
        explanation: "CharacterMovementComponent包含大量移动参数，可以在运行时动态修改，如冲刺时增加速度、蹲下时减少速度。"
      },
      {
        word: "GetController()->GetControlRotation()",
        meaning: "获取控制器的旋转方向（摄像机朝向）",
        breakdown: { root: "APawn / ACharacter" },
        explanation: "ControlRotation是控制器的旋转，通常代表摄像机朝向，用于计算角色移动方向（相对于摄像机的前后左右）。"
      }
    ],
    quiz: {
      question: "ACharacter相比APawn增加了什么核心功能？",
      options: [
        "网络复制支持",
        "UCharacterMovementComponent和UCapsuleComponent，提供完整的角色移动系统",
        "蓝图支持",
        "物理模拟"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 22,
    root: "Enhanced Input System",
    origin: "输入系统",
    meaning: "UE5的增强输入系统，替代传统输入绑定",
    description: "Enhanced Input System 是UE5引入的新一代输入系统，相比传统的BindAxis/BindAction更加灵活强大。核心概念：InputAction（输入动作，定义输入类型）、InputMappingContext（输入映射上下文，定义按键绑定）、InputModifier（输入修改器，如死区、缩放）、InputTrigger（触发条件，如按下、释放、长按）。使用流程：创建InputAction资产→创建InputMappingContext资产→在C++中绑定→运行时添加MappingContext。支持运行时动态切换输入方案，适合多平台和多控制方案的游戏。",
    examples: [
      {
        word: "EnhancedInputComponent->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AMyChar::Move)",
        meaning: "绑定移动InputAction到Move函数",
        breakdown: { root: "Enhanced Input System" },
        explanation: "ETriggerEvent::Triggered表示持续触发（按住时每帧调用），适合移动输入；Pressed/Released适合单次触发的动作。"
      },
      {
        word: "PlayerController->AddMappingContext(DefaultMappingContext, 0)",
        meaning: "添加输入映射上下文，优先级为0",
        breakdown: { root: "Enhanced Input System" },
        explanation: "MappingContext可以在运行时动态添加/移除，实现不同状态下的输入方案切换，如UI模式和游戏模式。"
      },
      {
        word: "void AMyChar::Move(const FInputActionValue& Value)",
        meaning: "处理移动输入的回调函数",
        breakdown: { root: "Enhanced Input System" },
        explanation: "FInputActionValue包含输入值，通过Get<FVector2D>()获取2D轴输入，用于计算移动方向。"
      }
    ],
    quiz: {
      question: "Enhanced Input System相比传统输入系统的主要优势是？",
      options: [
        "性能更好，占用更少内存",
        "支持运行时动态切换输入方案，更灵活的触发条件和修改器",
        "代码更简洁",
        "只支持键盘输入"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 23,
    root: "Async / 异步编程",
    origin: "性能优化",
    meaning: "UE的异步任务系统，避免主线程阻塞",
    description: "UE提供了多种异步编程方式，避免在游戏主线程执行耗时操作。主要方式：AsyncTask（在线程池执行任务）、FRunnable（自定义线程）、UE5的Coroutines（协程，需要插件）、Async Loading（异步资产加载）。关键原则：只在游戏线程操作UObject和渲染资源；使用线程安全的数据结构（FCriticalSection、TAtomic）；通过AsyncTask(ENamedThreads::GameThread, ...)将结果回调到游戏线程。FSoftObjectPath配合StreamableManager实现异步资产加载，避免卡顿。",
    examples: [
      {
        word: "AsyncTask(ENamedThreads::AnyBackgroundThreadNormalTask, [this](){ /* 耗时操作 */ })",
        meaning: "在后台线程执行耗时任务",
        breakdown: { root: "Async / 异步编程" },
        explanation: "Lambda中执行耗时的计算或IO操作，完成后通过AsyncTask(ENamedThreads::GameThread, ...)回到主线程更新状态。"
      },
      {
        word: "StreamableManager.RequestAsyncLoad(SoftPath, FStreamableDelegate::CreateUObject(this, &AMyActor::OnAssetLoaded))",
        meaning: "异步加载资产，加载完成后回调",
        breakdown: { root: "Async / 异步编程" },
        explanation: "异步加载避免了同步加载时的卡顿，特别适合大型资产（如角色模型、关卡数据），是开放世界游戏的必备技术。"
      },
      {
        word: "FCriticalSection Mutex; FScopeLock Lock(&Mutex)",
        meaning: "使用互斥锁保护共享数据",
        breakdown: { root: "Async / 异步编程" },
        explanation: "FScopeLock是RAII风格的锁，在作用域结束时自动释放，避免死锁。保护多线程共享的非线程安全数据。"
      }
    ],
    quiz: {
      question: "在UE的多线程编程中，为什么不能在后台线程直接操作UObject？",
      options: [
        "后台线程没有权限访问UObject",
        "UObject的GC和内存管理不是线程安全的，可能导致崩溃",
        "后台线程速度太慢",
        "这是UE的编译器限制"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 24,
    root: "GENERATED_BODY()",
    origin: "反射宏系统",
    meaning: "UHT生成代码的占位宏，每个UCLASS必须包含",
    description: "GENERATED_BODY() 是虚幻头文件工具（UHT，Unreal Header Tool）生成代码的占位符，必须放在每个UCLASS、USTRUCT、UENUM类体的第一行。UHT在编译前扫描.h文件，根据UCLASS/UPROPERTY/UFUNCTION等宏生成反射代码（存放在.generated.h文件中），GENERATED_BODY()会被替换为这些生成的代码。如果忘记添加GENERATED_BODY()，编译会报错。每个包含UCLASS的.h文件必须包含对应的#include \"ClassName.generated.h\"。这是UE反射系统的基础设施。",
    examples: [
      {
        word: "#include \"MyActor.generated.h\"",
        meaning: "包含UHT生成的反射代码头文件",
        breakdown: { root: "GENERATED_BODY()" },
        explanation: "每个UCLASS的.h文件必须在最后一个#include处包含.generated.h，这是UHT生成代码的存放位置。"
      },
      {
        word: "UCLASS() class AMyActor : public AActor { GENERATED_BODY(); }",
        meaning: "完整的UCLASS声明模板",
        breakdown: { root: "GENERATED_BODY()" },
        explanation: "GENERATED_BODY()必须是类体的第一个语句，UHT会将其替换为构造函数声明、反射函数等生成代码。"
      },
      {
        word: "USTRUCT(BlueprintType) struct FMyData { GENERATED_BODY(); }",
        meaning: "结构体也需要GENERATED_BODY()",
        breakdown: { root: "GENERATED_BODY()" },
        explanation: "USTRUCT同样需要GENERATED_BODY()，使结构体支持反射、蓝图使用和网络序列化。"
      }
    ],
    quiz: {
      question: "GENERATED_BODY()宏的作用是什么？",
      options: [
        "生成类的构造函数",
        "作为UHT生成反射代码的占位符，被替换为生成的代码",
        "声明类的虚函数表",
        "优化类的内存布局"
      ],
      correctAnswer: 1
    }
  },
  {
    id: 25,
    root: "Garbage Collection（GC）",
    origin: "内存管理",
    meaning: "UE的自动内存管理系统，管理UObject生命周期",
    description: "UE的垃圾回收系统自动管理所有UObject的内存，开发者不需要手动delete UObject。GC工作原理：从根集（Root Set）出发，标记所有可达的UObject，未被标记的对象会被回收。保持对象存活的方式：UPROPERTY()引用、AddToRoot()、强引用容器（TArray<UObject*>配合UPROPERTY）。常见GC问题：裸指针（未用UPROPERTY标记）可能变为野指针；循环引用（用TWeakObjectPtr打破）；频繁创建销毁对象导致GC压力（用对象池优化）。GC默认每帧检查，可通过gc.TimeBetweenPurgingPendingKillObjects调整频率。",
    examples: [
      {
        word: "MyObject->AddToRoot()",
        meaning: "将对象添加到GC根集，防止被回收",
        breakdown: { root: "Garbage Collection（GC）" },
        explanation: "AddToRoot使对象永远不会被GC回收，适合全局单例对象。使用后记得在不需要时调用RemoveFromRoot()。"
      },
      {
        word: "IsValid(MyObject)",
        meaning: "检查UObject是否有效（未被GC回收）",
        breakdown: { root: "Garbage Collection（GC）" },
        explanation: "IsValid()检查指针非空且对象未被标记为PendingKill，是访问UObject前的安全检查，比直接判断nullptr更可靠。"
      },
      {
        word: "NewObject<UMyObject>(this)",
        meaning: "创建新的UObject实例",
        breakdown: { root: "Garbage Collection（GC）" },
        explanation: "NewObject是创建UObject的标准方式，第一个参数是Outer（所有者），GC会追踪Outer链来决定对象是否可达。"
      }
    ],
    quiz: {
      question: "如何防止一个UObject被GC意外回收？",
      options: [
        "使用new关键字创建对象",
        "用UPROPERTY()标记引用该对象的指针，或调用AddToRoot()",
        "在对象上调用Destroy()",
        "使用std::shared_ptr包装对象"
      ],
      correctAnswer: 1
    }
  }
];
