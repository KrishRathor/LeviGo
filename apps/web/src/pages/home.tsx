import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  return (
    <div className=" h-screen w-screen border border-black bg-[#09090B]">
      <div className="">
        <Navbar />
        <hr className="h-[1px] border-none bg-[#27272A]" />
      </div>
      <div>
        <CreateReplDialog />
      </div>
    </div>
  );
};

export default Home;

const CreateReplDialog: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  return (
    <div className=" mx-auto w-fit text-white">
      <Dialog>
        <DialogTrigger>
          <CodeTemlates setTemplate={setSelectedTemplate} />
        </DialogTrigger>
        <DialogContent className="border-[#27272A] bg-[#09090B] text-white ">
          <Repl template={selectedTemplate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ReplProps {
  template: string;
}

const Repl: React.FC<ReplProps> = (props) => {
  const { template } = props;
  const [projectName, setProejctName] = useState<string>('');
  const [templateValue, setTemplateValue] = useState<string>();
  const router = useRouter();

  const executeCommand = api.code.getBoilerPlateCodeInRepl.useMutation({
    onSuccess: data => {
    console.log('command executed', data);
    }
  })
  
  const createRepl = api.code.createRepl.useMutation({
    onSuccess: async data => {
      console.log(data);
      executeCommand.mutateAsync({
        projectName: projectName,
        repl: template 
      })
      router.push(`editor?project=${projectName}&repl=${template}`);
    }
  });
 
  const handleCreateRepl = async () => {
    console.log('i was here');
    createRepl.mutateAsync({
      projectName: projectName,
      repl: template
    })
  }
  
  return (
    <div>
      <p className="text-2xl">Create new Project</p>
      <p className="text-sm">
        Create new repl of your favourite tech stack in one click
      </p>
      <br />
      <div>
        <p>Name</p>
        <Input
          onChange={(e) => setProejctName((_prev) => e.target.value)}
          className="mt-2 border-[#27272A] bg-[#09090B]"
        />
      </div>
      <div className="mt-4">
        <p>Set template</p>
        <ComboboxDemo />
      </div>
      <div className="mt-4 flex">
        <Button variant="outline" className="text-black">
          Cancel
        </Button>
        <Button onClick={handleCreateRepl} variant="outline" className="ml-4 text-black">
          Create
        </Button>
      </div>
    </div>
  );
};

interface TemplateCardProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
}

const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  const { image, title, description } = props;

  return (
    <div className="mt-2 flex h-[10vh] w-[22vw] items-center rounded-md border border-[#27272A] bg-[#09090B] p-4 text-white hover:cursor-pointer hover:border-[#09090B] hover:bg-[#27272A] ">
      <Image
        src={image.src}
        alt={image.alt}
        width={80}
        height={60}
        className="rounded-full"
      />
      <div>
        <p className="ml-4 text-3xl">{title}</p>
        <p className="ml-4 w-fit text-gray-400 ">{description}</p>
      </div>
    </div>
  );
};
interface CodeTemlatesInterface {
  setTemplate: Function;
}

const CodeTemlates: React.FC<CodeTemlatesInterface> = (props) => {
  const { setTemplate } = props;

  const templetes = [
    {
      image: {
        src: "/react.png",
        alt: "react",
      },
      title: "React",
      description: "React template with Vite",
    },
    {
      image: {
        src: "/html.png",
        alt: "html",
      },
      title: "HTML/CSS",
      description: "Vanilla html-css-js playground",
    },
    {
      image: {
        src: "/next.jpg",
        alt: "nextjs",
      },
      title: "NextJs",
      description: "NextJs playground",
    },
    {
      image: {
        src: "/node.jpg",
        alt: "node",
      },
      title: "NodeJs",
      description: "NodeJS Playground",
    },
  ];

  return (
    <div className="m-4 mx-auto flex w-[50vw] flex-wrap p-2">
      {templetes.map((tmp, index) => (
        <div
          onClick={() => {
            setTemplate(tmp.title);
            console.log(tmp.title);
          }}
          className="m-2"
          key={index}
        >
          <TemplateCard
            title={tmp.title}
            description={tmp.description}
            image={{
              src: tmp.image.src,
              alt: tmp.image.alt,
            }}
          />
        </div>
      ))}
    </div>
  );
};
interface FrameWorkI {
  value: string;
  label: string;
}

const ComboboxDemo: React.FC = () => {
  const temp = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nodejs",
      label: "NodeJs",
    },
    {
      value: "react",
      label: "React",
    },
    {
      value: "html/css",
      label: "HTML/CSS",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = useState<string>();
  const [frameworks, setFrameworks] = useState<FrameWorkI[]>(temp);

  useEffect(() => {
    if (searchValue) {
      const length = searchValue.length;
      const newframes = frameworks.filter(
        (frame) =>
          frame.label.toLowerCase().substring(0, length) === searchValue,
      );
      setFrameworks((_prev) => newframes);
    } else {
      setFrameworks(temp);
    }
  }, [searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="bg-[#09090B] hover:bg-[#27272A] hover:text-white"
        asChild
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-[#09090B] text-white">
          <Input
            placeholder="Search Framework"
            className="bg-[#09090B] text-white"
            onChange={(e) => {
              console.log(e.target.value);
              setSearchValue((_prev) => e.target.value);
            }}
          />
          <CommandGroup>
            {frameworks.map((framework, index) => (
              <div
                key={index}
                className="m-2 h-[4vh] cursor-pointer rounded-sm bg-[#09090B] p-2 text-white hover:bg-[#27272A]"
                onClick={() => {
                  setValue((_prev) => framework.value);
                  setOpen((_prev) => false);
                }}
              >
                {framework.label}
              </div>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
